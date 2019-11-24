import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import SliderCarousel from 'react-slick';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { flexCenter } from 'src/styles';
import Arrow from 'src/components/Carousel/Arrow';
import uiOption from 'src/constants/ui';
import { ForwardedRefComponent } from 'src/components/Carousel/LoadableCarousel';
import { BreakPoint, greaterThanOrEqualTo, orBelow } from 'src/utils/mediaQuery';
import { TopBanner } from 'src/types/sections';

const TOP_BANNER_LG_WIDTH = 430;
const TOP_BANNER_SM_WIDTH = 355;

const slideOverlayCSS = css`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  transition: background-color 0.1s;
`;

const slideCenterOverlayCSS = css`
  background: rgba(0, 0, 0, 0);
  transition: background-color 0.1s;
`;

const TopBannerItemWrapper = styled.div`
  position: relative;
  ${flexCenter};
  flex-shrink: 0;
  ${orBelow(
    BreakPoint.LG,
    css`
      margin: 0 5px;
    `,
  )};
  margin: 0;
`;

const sliderCSS = css`
  .slick-list {
    height: 100%;
  }
  .slick-track {
    will-change: transform;
  }
  &.slick-slider {
    ${greaterThanOrEqualTo(
      BreakPoint.XS + 1,
      css`
        height: calc((100vw - 20px) / 1.5);
      `,
    )};

    ${greaterThanOrEqualTo(
      BreakPoint.SM + 1,
      css`
        height: calc(${TOP_BANNER_SM_WIDTH}px / 1.5);
      `,
    )};

    ${greaterThanOrEqualTo(
      BreakPoint.LG + 1,
      css`
        height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
      `,
    )};
  }
  ${greaterThanOrEqualTo(
    BreakPoint.XS + 1,
    css`
      .slick-slide {
        .slide-overlay {
          ${slideOverlayCSS};
          min-width: 280px;
          width: calc(100vw - 20px);
          height: calc((100vw - 20px) / 1.5);
        }
      }

      .slick-slide.slick-center {
        .slide-overlay {
          ${slideCenterOverlayCSS};
        }
      }
    `,
  )};

  ${greaterThanOrEqualTo(
    BreakPoint.SM + 1,
    css`
      .slick-slide {
        .slide-overlay {
          ${slideOverlayCSS};
          height: 100%;
          width: ${TOP_BANNER_SM_WIDTH}px;
        }
      }

      .slick-slide.slick-center {
        .slide-overlay {
          ${slideCenterOverlayCSS};
        }
      }
    `,
  )};

  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      &.slick-slider {
        overflow: hidden;
        height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
      }
      .slick-slide {
        .slide-item-inner {
          height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
          width: ${TOP_BANNER_LG_WIDTH}px;
          transform: scale(0.965);
          margin: 0 -2.5px;
          transition: all 0.2s;
        }
      }
      .slick-slide.slick-center {
        width: 439px;
        .slide-item-inner {
          height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
          width: ${TOP_BANNER_LG_WIDTH}px;
          transform: scale(1);
          transition: all 0.2s;
        }
      }

      .slick-slide {
        .slide-overlay {
          top: 0;
          width: ${TOP_BANNER_LG_WIDTH}px;
          left: -2px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.5);
          transition: all 0.2s;
          transform: scale(0.965);
        }
      }
      .slick-slide.slick-center {
        .slide-overlay {
          width: ${TOP_BANNER_LG_WIDTH}px;
          transform: scale(1);
          transition: all 0.2s;
        }
      }
    `,
  )};
  .slide-overlay {
    height: 100%;
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
    ${flexCenter};
    ${greaterThanOrEqualTo(
      BreakPoint.SM + 1,
      css`
        height: 237px;
      `,
    )};
    ${greaterThanOrEqualTo(
      BreakPoint.LG + 1,
      css`
        height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
      `,
    )};
  }
`;

const slideCSS = css`
  ${greaterThanOrEqualTo(
    BreakPoint.XS + 1,
    css`
      min-width: 280px;
      width: calc(100vw - 20px);
      height: calc((100vw - 20px) / 1.5);
    `,
  )};
  ${greaterThanOrEqualTo(
    BreakPoint.SM + 1,
    css`
      width: ${TOP_BANNER_SM_WIDTH}px;
      height: calc(${TOP_BANNER_SM_WIDTH}px / 1.5);
    `,
  )};

  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      width: ${TOP_BANNER_LG_WIDTH}px;
      transform: scale(0.965);
      height: calc(${TOP_BANNER_LG_WIDTH}px / 1.5);
    `,
  )}
`;

const ItemInner = styled.div`
  border-radius: 6px;
  background-size: cover;
  ${slideCSS};
`;

const TopBannerCurrentPositionInner = styled.div`
  position: absolute;
  width: 54px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.4);
  right: 10px;
  bottom: 10px;
  ${flexCenter};
`;

const positionLabelCSS = css`
  color: white;
  font-size: 12px;
  line-height: 22px;
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
  top: 0;
  left: 1px;
  border-radius: 6px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${slideCSS};
`;

interface TopBannerCurrentPositionProps {
  total: number;
  currentPosition: number;
}

const TopBannerCurrentPosition: React.FC<TopBannerCurrentPositionProps> = props => (
  <TopBannerCurrentPositionInner className={'slick-position'}>
    <span css={currentPosCSS}>
      {props.currentPosition} / <span css={totalCountCSS}>{props.total}</span>
    </span>
  </TopBannerCurrentPositionInner>
);

interface TopBannerItemProps {
  item: TopBanner;
  loading?: boolean;
  center?: boolean;
}

const TopBannerItem: React.FC<TopBannerItemProps> = React.memo(props => (
  <TopBannerItemWrapper>
    <ItemInner
      className={'slide-item-inner'}
      css={css`
        ${greaterThanOrEqualTo(
          BreakPoint.LG + 1,
          css`
            transform: ${props.loading && !props.center ? 'scale(0.965)' : 'scale(1)'};
            margin: ${props.loading ? '0 1px' : '0'};
          `,
        )};
      `}>
      <img
        css={css`
          border-radius: 6px;
          // Fix me 올바른 사이즈 배너가 올 때 다시 테스트
          object-fit: cover; // IE 11 미지원
          object-position: 0 0; // IE 11 미지원

          ${greaterThanOrEqualTo(
            BreakPoint.XS,
            css`
              width: calc(100vw - 20px);
              min-width: 280px;
              height: calc((100vw - 20px) / 1.5);
            `,
          )};
          ${greaterThanOrEqualTo(
            BreakPoint.SM + 1,
            css`
              width: ${TOP_BANNER_SM_WIDTH}px;
              height: 237px;
            `,
          )};

          ${greaterThanOrEqualTo(
            BreakPoint.LG + 1,
            css`
              width: ${TOP_BANNER_LG_WIDTH}px;
              height: 286px;
            `,
          )}
        `}
        alt={props.item.title}
        src={props.item.main_image_url}
      />
    </ItemInner>
    <div
      css={props.loading && !props.center ? carouselLoadingOverlay : null}
      className={'slide-overlay'}
    />
  </TopBannerItemWrapper>
));

const arrowCSS = css`
  :hover {
    opacity: 1;
  }
  opacity: 0.5;
  transition: opacity 0.1s;
  cursor: pointer;
  @media (hover: none) {
    :hover {
      opacity: 0.5;
    }
  }
`;

const arrowWrapperCSS = css`
  display: none;
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      display: block;
      position: absolute;
      opacity: 0.7;
      bottom: 143.5px;
    `,
  )};
`;

const PositionOverlay = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  height: 0;
  background: transparent;
  left: 50%;
  transform: translate(-50%, 0);
  ${greaterThanOrEqualTo(
    BreakPoint.XS + 1,
    css`
      width: calc(100vw - 20px);
      min-width: 280px;
    `,
  )};
  ${greaterThanOrEqualTo(
    BreakPoint.SM + 1,
    css`
      width: ${TOP_BANNER_SM_WIDTH}px;
    `,
  )};
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      width: ${TOP_BANNER_LG_WIDTH}px;
    `,
  )};
`;

const TopBannerCarouselWrapper = styled.section`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
`;

interface TopBannerCarouselProps {
  banners: TopBanner[];
  changePosition: (pos: number) => void;
  setInitialized: () => void;
  forwardRef: React.RefObject<SliderCarousel>;
}
interface TopBannerCarouselContainerProps {
  banners: TopBanner[];
}

interface TopBannerCarouselLoadingProps {
  left: TopBanner;
  center: TopBanner;
  right: TopBanner;
}

const TopBannerCarouselLoading: React.FC<TopBannerCarouselLoadingProps> = props => (
  <div
    css={css`
      ${flexCenter};
      @media (max-width: 1279px) and (-ms-high-contrast: none),
        (-ms-high-contrast: active) {
        // position: relative;
        //left: calc(100vw - 10px);
        // transform: translateX(-50%);
        //display: none;

        //  IE11 flex center 확인
      }
    `}>
    <TopBannerItem loading={true} item={props.left} />
    <TopBannerItem center={true} loading={true} item={props.center} />
    <TopBannerItem loading={true} item={props.right} />
  </div>
);

const TopBannerCarousel: React.FC<TopBannerCarouselProps> = React.memo(props => {
  const { banners, forwardRef, setInitialized } = props;
  return (
    <ForwardedRefComponent
      ref={forwardRef}
      className={'center slider variable-width'}
      css={sliderCSS}
      slidesToShow={1}
      initialSlide={0}
      slidesToScroll={1}
      speed={uiOption.topBannerCarouselSpeed}
      autoplaySpeed={uiOption.topBannerCarouselPlaySpeed}
      autoplay={true}
      arrows={false}
      infinite={true}
      variableWidth={true}
      afterChange={(next: number) => {
        let event = null;
        if (typeof Event === 'function') {
          event = new Event('resize');
        } else {
          event = document.createEvent('Event');
          event.initEvent('resize', true, true);
        }
        window.dispatchEvent(event);
        props.changePosition(next);
      }}
      onInit={() => {
        setInitialized();
      }}
      centerMode={true}>
      {banners.map((item, index) => (
        <a href={item.landing_url} key={index} aria-label={item.title}>
          <TopBannerItem item={item} />
        </a>
      ))}
    </ForwardedRefComponent>
  );
});

export const TopBannerCarouselContainer: React.FC<TopBannerCarouselContainerProps> = React.memo(
  props => {
    const [carouselInitialized, setCarouselInitialized] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const { banners } = props;
    const slider = React.useRef<SliderCarousel>();
    const wrapper = React.useRef<HTMLElement>();

    let firstClientX = 0;
    let clientX = 0;

    const changePosition = useCallback(item => {
      setCurrentPosition(item || 0);
    }, []);
    const setInitialized = useCallback(() => {
      setCarouselInitialized(true);
    }, []);

    const handleClickLeft = (e: FormEvent) => {
      e.preventDefault();
      if (slider.current) {
        slider.current.slickPrev();
      }
    };
    const handleClickRight = (e: FormEvent) => {
      e.preventDefault();
      if (slider.current) {
        slider.current.slickNext();
      }
    };

    const preventTouch = e => {
      const minValue = 5; // threshold

      clientX = e.touches[0].clientX - firstClientX;

      // Vertical scrolling does not work when you start swiping horizontally.
      if (Math.abs(clientX) > minValue) {
        e.preventDefault();
        e.returnValue = false;

        return false;
      }
      return e;
    };

    const touchStart = e => {
      firstClientX = e.touches[0].clientX;
    };

    useEffect(() => {
      if (wrapper.current) {
        wrapper.current.addEventListener('touchstart', touchStart);
        wrapper.current.addEventListener('touchmove', preventTouch, {
          passive: false,
        });
      }

      return () => {
        if (wrapper.current) {
          wrapper.current.removeEventListener('touchstart', touchStart);
          wrapper.current.removeEventListener('touchmove', preventTouch, {
            // @ts-ignore
            passive: false,
          });
        }
      };
    }, [wrapper]);

    if (banners.length < 3) {
      return null;
    }
    return (
      <TopBannerCarouselWrapper ref={wrapper}>
        <h3 className={'a11y'}>상단 배너 영역</h3>
        {!carouselInitialized && (
          <TopBannerCarouselLoading
            left={banners[banners.length - 1]}
            center={banners[0]}
            right={banners[1]}
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
            <form>
              <div
                css={css`
                  ${arrowWrapperCSS};
                  left: -40px;
                  transform: translate(-50%, 50%);
                `}>
                <Arrow
                  side={'left'}
                  onClickHandler={handleClickLeft}
                  label={'이전'}
                  wrapperStyle={css`
                    ${arrowCSS};
                    opacity: 0.5;
                  `}
                />
              </div>
              <div
                css={css`
                  ${arrowWrapperCSS};
                  transform: translate(50%, 50%);
                  right: -40px;
                `}>
                <Arrow
                  onClickHandler={handleClickRight}
                  side={'right'}
                  label={'다음'}
                  wrapperStyle={css`
                    ${arrowCSS};
                    opacity: 0.5;
                  `}
                />
              </div>
            </form>
          </PositionOverlay>
        </>
      </TopBannerCarouselWrapper>
    );
  },
);
