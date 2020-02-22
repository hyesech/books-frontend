import '@babel/polyfill/noConflict';
import 'intersection-observer';

import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore, { RootState } from 'src/store/config';
import withReduxSaga from 'next-redux-saga';
import { ConnectedRouter } from 'connected-next-router';
import { CacheProvider, Global } from '@emotion/core';
import { defaultTheme, partialResetStyles, resetStyles } from 'src/styles';
import GNB from 'src/components/GNB';
import { ThemeProvider } from 'emotion-theming';
import Footer from 'src/components/Footer';
import styled from '@emotion/styled';
import { BrowserLocationWithRouter } from 'src/components/Context';
import React, { ErrorInfo } from 'react';
// Todo move css import code
import 'slick-carousel/slick/slick.css';
import { PartialSeparator } from 'src/components/Misc';
import { cache } from 'emotion';
import createCache from '@emotion/cache';

import { ViewportIntersectionProvider } from 'src/hooks/useViewportIntersection';
import Meta from 'src/pages/Meta';
import sentry from 'src/utils/sentry';

const { captureException } = sentry();

interface StoreAppProps {
  store: Store<RootState>;
  // tslint:disable-next-line
  pageProps: any;
  isPartials?: boolean;
  // tslint:disable-next-line
  query: any;
  ctxPathname?: string;
  hasError: boolean;
  sentryErrorEventId?: string;
  error?: ErrorInfo | Error;
}

interface StoreAppState {
  hasError: boolean;
  sentryErrorEventId?: string;
  error?: ErrorInfo | Error;
}

const Contents = styled.main`
  margin: 0 auto;
`;

class StoreApp extends App<StoreAppProps, StoreAppState> {
  public static async getInitialProps({ ctx, Component, ...rest }: AppContext) {
    const isPartials = !!ctx.pathname.match(/\/partials\//u);
    // eslint-disable-next-line init-declarations
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    // @ts-ignore
    return {
      pageProps,
      isPartials,
      ctxPathname: rest.router ? rest.router.asPath : '/',
      query: {
        ...ctx.query,
        // @ts-ignore
        is_login: ctx?.query?.is_login === 'true' ? 'true' : 'false',
      },
    };
  }

  public async serviceWorkerInit() {
    try {
      if ('serviceWorker' in navigator) {
        // 서비스 워커 일단 끔
        // const { Workbox } = await import('workbox-window');
        // const wb = new Workbox('/service-worker.js');
        // wb.addEventListener('waiting', event => {});
        // wb.addEventListener('activated', event => {});
        // wb.addEventListener('installed', event => {});
        // wb.register();
      }
    } catch (error) {
      captureException(error);
    }
  }

  public componentDidMount() {
    if (!this.props.isPartials) {
      this.serviceWorkerInit();
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureException(error, {
      err: errorInfo,
      ...this.props,
    });
    super.componentDidCatch(error, errorInfo);
  }

  public render() {
    const {
      Component,
      ctxPathname,
      query,
      pageProps,
      isPartials,
      store,
      // @ts-ignore
      nonce,
    } = this.props;

    if (!pageProps || (pageProps.statusCode && pageProps.statusCode >= 400)) {
      return (
        <>
          <Global styles={resetStyles} />
          <Contents>
            <Component {...pageProps} />
          </Contents>
        </>
      );
    }

    if (isPartials) {
      return (
        <>
          <Head>
            <meta name="viewport" />
            {typeof document !== 'undefined' && <title>{document.title ?? ''}</title>}
          </Head>
          <PartialSeparator name="GLOBAL_STYLE_RESET" wrapped>
            <Global styles={partialResetStyles} />
          </PartialSeparator>
          {/* Todo Apply Layout */}
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </>
      );
    }
    return (
      // CacheProvider 올바르게 동작하는지 확인하기
      <>
        <Meta />
        <CacheProvider value={createCache({ ...cache, nonce })}>
          <Global styles={resetStyles} />
          <Provider store={store}>
            <ConnectedRouter>
              {/* Todo Apply Layout */}
              <ThemeProvider theme={defaultTheme}>
                <ViewportIntersectionProvider rootMargin="100px">
                  <GNB
                    searchKeyword={query.search || query.q}
                    isPartials={false}
                    isLoginForPartials={query.is_login}
                  />
                  <Contents>
                    <Component {...pageProps} />
                  </Contents>
                  <Footer />
                </ViewportIntersectionProvider>
              </ThemeProvider>
            </ConnectedRouter>
          </Provider>
        </CacheProvider>
      </>
    );
  }
}
export default withRedux(makeStore, { debug: false })(withReduxSaga(StoreApp));
