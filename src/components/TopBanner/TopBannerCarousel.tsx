import * as React from 'react';
import SliderCarousel from 'react-slick';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import 'slick-carousel/slick/slick-theme.css';
import { useCallback, useState } from 'react';
import { Svg } from 'src/components/Svg';
import { clearOutline, flexCenter } from 'src/styles';

const items = [
  {
    label: '1',
    url: 'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603112320_1559528600505.jpg',
    imageUrl:
      'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603112320_1559528600505.jpg',
  },
  {
    label: '2',
    url: 'https://active.ridibooks.com/ridibooks_top_banner/pc/20190521173618_1558427778288.jpg',
    imageUrl:
      'https://active.ridibooks.com/ridibooks_top_banner/pc/20190521173618_1558427778288.jpg',
  },
  {
    label: '3',
    url: 'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603114451_1559529891097.jpg',
    imageUrl:
      'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603114451_1559529891097.jpg',
  },
  {
    label: '19',
    url: 'https://active.ridibooks.com/ridibooks_top_banner/pc/20190604175023_1559638223869.jpg',
    imageUrl:
      'https://active.ridibooks.com/ridibooks_top_banner/pc/20190604175023_1559638223869.jpg',
  },
  {
    label: '20',
    url: 'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603171131_1559549491672.jpg',
    imageUrl:
      'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603171131_1559549491672.jpg',
  },
];

const TopBannerItemWrapper = styled.div`
  position: relative;
  ${flexCenter};
  margin: 0 5px;
  @media (min-width: 1000px) {
    margin: unset;
  }
`;

const sliderCSS = css`
  &.slick-slider {
    overflow: hidden;
    height: 237px;
  }

  .slick-slide {
    .slide-overlay {
      position: absolute;
      width: 355px;
      border-radius: 6px;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      transition: background-color 0.1s;
    }
  }

  .slick-slide.slick-center {
    .slide-overlay {
      background: rgba(0, 0, 0, 0);
      transition: background-color 0.1s;
    }
  }

  @media (min-width: 1000px) {
    &.slick-slider {
      overflow: hidden;
      height: 286px;
    }
    .slick-slide {
      .slide-item-inner {
        height: 286px;
        width: 430px;
        transform: scale(0.965);
        margin: 0 1px;
        transition: all 0.2s;
      }
    }

    .slick-slide.slick-center {
      .slide-item-inner {
        height: 286px;
        width: 430px;
        transform: scale(1);
        transition: all 0.2s;
      }
    }

    .slick-slide {
      .slide-overlay {
        width: 430px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.7);
        transition: all 0.2s;
        transform: scale(0.965);
      }
    }
    .slick-slide.slick-center {
      .slide-overlay {
        width: 430px;
        transform: scale(1);
        transition: all 0.2s;
      }
    }
  }
  .slick-position {
    display: none;
  }
  .slick-slide.slick-center {
    .slick-position {
      display: block;
    }
  }
  .slick-slide {
    height: 237px;
    ${flexCenter};
    @media (min-width: 1000px) {
      height: 286px;
    }
  }
`;

const ItemInner = styled.div`
  border-radius: 6px;
  height: 286px;
  @media (max-width: 999px) {
    width: 355px;
    height: 237px;
  }
  @media (min-width: 1000px) {
    width: 430px;
  }
  background-size: cover;
`;

const TopBannerCurrentPositionInner = styled.div`
  position: absolute;
  right: 10px;
  bottom: 11px;
  width: 54px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px rgba(180, 180, 180, 0.1);
  background-color: rgba(0, 0, 0, 0.4);
  @media (min-width: 1000px) {
    right: 16px;
    bottom: 11px;
  }
  ${flexCenter};
`;

const positionLabelCSS = css`
  color: white;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.3px;
  font-family: 'museo_sans', 'Helvetica Neue';
`;

const currentPosCSS = css`
  font-weight: bold;
  ${positionLabelCSS};
`;

const totalCountCSS = css`
  font-weight: 500;
  ${positionLabelCSS};
`;

const carouselLoadingOverlay = css`
  position: absolute;
  width: 355px;
  border-radius: 6px;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  @media (min-width: 1000px) {
    width: 430px;
    transform: scale(0.965);
  }
`;

interface TopBannerCurrentPositionProps {
  total: number;
  currentPosition: number;
}

const TopBannerCurrentPosition: React.FC<TopBannerCurrentPositionProps> = props => {
  return (
    <TopBannerCurrentPositionInner className={'slick-position'}>
      <span css={currentPosCSS}>
        {props.currentPosition} / <span css={totalCountCSS}>{props.total}</span>
      </span>
    </TopBannerCurrentPositionInner>
  );
};

interface TopBannerItemProps {
  label?: string;
  url?: string;
  imageUrl?: string;
  loading?: boolean;
  center?: boolean;
}

const TopBannerItem: React.FC<TopBannerItemProps> = props => {
  return (
    <TopBannerItemWrapper>
      <ItemInner
        className={'slide-item-inner'}
        css={css`
          @media (min-width: 1000px) {
            transform: ${props.loading && !props.center ? 'scale(0.965)' : 'scale(1)'};
            margin: ${props.loading ? '0 1px' : '0'};
          }
          background-image: url(${props.imageUrl});
        `}
      />
      <div
        css={props.loading && !props.center ? carouselLoadingOverlay : null}
        className={'slide-overlay'}
      />
    </TopBannerItemWrapper>
  );
};

const LeftArrow = styled.div`
  display: none;
  ${clearOutline};
  @media (min-width: 1000px) {
    display: initial;
    position: absolute;
    left: -40px;
    width: 40px;
    height: 40px;
    bottom: 143.5px;
    border-radius: 50px;
    border: solid 1px rgba(0, 0, 0, 0.07);
    background-color: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, 50%);
  }
`;
const RightArrow = styled.div`
  display: none;
  ${clearOutline};
  @media (min-width: 1000px) {
    display: initial;
    position: absolute;
    right: -40px;
    width: 40px;
    height: 40px;
    bottom: 143.5px;
    border-radius: 50px;
    border: solid 1px rgba(0, 0, 0, 0.07);
    background-color: rgba(255, 255, 255, 0.15);
    transform: translate(50%, 50%);
  }
`;

const PositionOverlay = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  height: 0;
  background: transparent;
  width: 355px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 0;
  @media (min-width: 1000px) {
    width: 430px;
  }
`;

interface TopBannerCarouselProps {
  // tslint:disable-next-line:no-any
  banners: any[];
  changePosition: (pos: number) => void;
  setInitialized: () => void;
  forwardRef: React.RefObject<SliderCarousel>;
}
interface TopBannerCarouselContainerProps {
  // tslint:disable-next-line:no-any
  banners?: any[];
}

const Slider = dynamic(import('./LoadableCarousel'), { ssr: false, loading: () => null });
// @ts-ignore
// tslint:disable-next-line:no-any
const ForwardedRefComponent = React.forwardRef((props, ref: React.RefObject<any>) => {
  return <Slider {...props} forwardedRef={ref} />;
});

interface TopBannerCarouselLoadingProps {
  left: string;
  center: string;
  right: string;
}

const TopBannerCarouselLoading: React.FC<TopBannerCarouselLoadingProps> = props => {
  return (
    <div css={flexCenter}>
      <TopBannerItem loading={true} imageUrl={props.left} />
      <TopBannerItem center={true} loading={true} imageUrl={props.center} />
      <TopBannerItem loading={true} imageUrl={props.right} />
    </div>
  );
};

const TopBannerCarousel: React.FC<TopBannerCarouselProps> = React.memo(props => {
  const { banners } = props;
  return (
    <ForwardedRefComponent
      ref={props.forwardRef}
      className={'center slider variable-width'}
      css={sliderCSS}
      slidesToShow={1}
      initialSlide={0}
      slidesToScroll={1}
      autoplaySpeed={5000}
      autoplay={true}
      arrows={false}
      infinite={true}
      variableWidth={true}
      afterChange={(item: number) => {
        props.changePosition(item);
      }}
      onInit={() => {
        props.setInitialized();
      }}
      centerMode={true}>
      {banners.map((item, index) => {
        return (
          <TopBannerItem key={index} label={item.label} url={item.url} imageUrl={item.imageUrl} />
        );
      })}
    </ForwardedRefComponent>
  );
});

export const TopBannerCarouselContainer: React.FC<TopBannerCarouselContainerProps> = React.memo(
  props => {
    const [carouselInitialized, setCarouselInitialized] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [banners] = useState(props.banners || items);
    const slider: React.RefObject<SliderCarousel> = React.createRef();
    const changePosition = useCallback(item => {
      setCurrentPosition(item || 0);
    }, []);
    const setInitialized = useCallback(() => {
      setCarouselInitialized(true);
    }, []);

    const handleClickLeft = () => {
      // Todo Enter Control
      if (slider.current) {
        slider.current.slickPrev();
      }
    };
    const handleClickRight = () => {
      // Todo Enter Control
      if (slider.current) {
        slider.current.slickNext();
      }
    };

    return (
      <>
        {!carouselInitialized && (
          <TopBannerCarouselLoading
            left={
              'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603171131_1559549491672.jpg'
            }
            center={
              'https://active.ridibooks.com/ridibooks_top_banner/pc/20190603112320_1559528600505.jpg'
            }
            right={
              'https://active.ridibooks.com/ridibooks_top_banner/pc/20190521173618_1558427778288.jpg'
            }
          />
        )}
        <>
          <TopBannerCarousel
            forwardRef={slider}
            banners={banners}
            changePosition={changePosition}
            setInitialized={setInitialized}
          />
          <PositionOverlay>
            <TopBannerCurrentPosition
              total={banners.length}
              currentPosition={currentPosition + 1}
            />
            <LeftArrow tabIndex={1} onKeyDown={handleClickLeft} onClick={handleClickLeft}>
              <Svg
                css={css`
                  fill-opacity: 0.7;
                `}
                fill={'#d1d5d9'}
                iconName={'LeftArrow'}
                width={'40px'}
                height={'40px'}
              />
            </LeftArrow>
            <RightArrow tabIndex={1} onKeyDown={handleClickRight} onClick={handleClickRight}>
              <Svg
                css={css`
                  fill-opacity: 0.7;
                  transform-origin: center;
                  transform: rotate(180deg) translate(3%, 0);
                `}
                fill={'#d1d5d9'}
                iconName={'LeftArrow'}
                width={'40px'}
                height={'40px'}
              />
            </RightArrow>
          </PositionOverlay>
        </>
      </>
    );
  },
);
