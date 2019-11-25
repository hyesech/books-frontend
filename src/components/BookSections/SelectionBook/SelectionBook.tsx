import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { DisplayType, MdBook, SectionExtra } from 'src/types/sections';
import { View, WindowWidthQuery } from 'libreact/lib/WindowWidthQuery';
import SelectionBookList from 'src/components/BookSections/SelectionBook/SelectionBookList';
import SelectionBookCarousel from 'src/components/BookSections/SelectionBook/SelectionBookCarousel';
// import BookMeta from 'src/components/BookMeta/BookMeta';
import { css } from '@emotion/core';
import { ThumbnailWrapper } from 'src/components/BookThumbnail/ThumbnailWrapper';
import {
  SectionTitle,
  SelectionOption,
} from 'src/components/BookSections/BookSectionContainer';
import { PortraitBook } from 'src/components/Book/PortraitBook';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';
import ArrowV from 'src/svgs/ArrowV.svg';
import { useBookDetailSelector } from 'src/hooks/useBookDetailSelector';
import BookMeta from 'src/components/BookMeta/BookMeta';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/config';
import BookBadgeRenderer from 'src/components/Badge/BookBadgeRenderer';
import { BreakPoint, orBelow } from 'src/utils/mediaQuery';
import FreeBookRenderer from 'src/components/Badge/FreeBookRenderer';
import SetBookRenderer from 'src/components/Badge/SetBookRenderer';
import ThumbnailRenderer from 'src/components/BookThumbnail/ThumbnailRenderer';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SectionWrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 6px;
  -webkit-overflow-scrolling: touch;
`;

interface SelectionBookProps {
  items: MdBook[];
  title: string;
  option: SelectionOption;
  genre: string;
  type: DisplayType;
  categoryId?: number;
  extra?: SectionExtra;
}

interface SelectionBookItemProps {
  book: MdBook;
  genre: string;
  isAIRecommendation: boolean;
  width: number;
  type: DisplayType;
  isIntersecting: boolean;
}

export const SelectionBookItem: React.FC<SelectionBookItemProps> = props => {
  const { book, isAIRecommendation, genre, type, isIntersecting } = props;
  return (
    <>
      <a
        css={css`
          display: inline-block;
        `}
        href={new URL(`/books/${book.b_id}`, publicRuntimeConfig.STORE_HOST).toString()}>
        <ThumbnailWrapper>
          <ThumbnailRenderer
            width={props.width || 140}
            book={{ b_id: book.b_id, detail: book.detail }}
            imgSize={'xxlarge'}
            isIntersecting={isIntersecting}>
            <div
              css={css`
                position: absolute;
                display: block;
                top: -7px;
                left: -7px;
              `}>
              <BookBadgeRenderer
                type={type}
                wrapperCSS={css``}
                isWaitFree={book.detail?.series?.property.is_wait_free}
                discountPercentage={
                  book.detail?.price_info?.buy?.discount_percentage || 0
                }
              />
            </div>
            <FreeBookRenderer
              freeBookCount={book.detail?.series?.price_info?.buy?.free_book_count || 0}
            />
            <SetBookRenderer setBookCount={book.detail?.setbook?.member_books_count} />
          </ThumbnailRenderer>
        </ThumbnailWrapper>
      </a>

      {book.detail && (
        <BookMeta
          showTag={['bl', 'bl-serial'].includes(genre)}
          book={book.detail}
          width={`${props.width || 140}px`}
          showRating={type === DisplayType.HomeMdSelection}
          isAIRecommendation={false}
          ratingInfo={book.rating}
        />
      )}

      {isAIRecommendation && (
        <button
          css={css`
            margin-top: 8px;
            border-radius: 4px;
            border: solid 1px #d6d6d6;
            padding: 6px 7px;
            font-size: 10px;
            font-weight: bold;
            line-height: 1;
            color: #aaaaaa;
            outline: none;
          `}>
          추천 제외
        </button>
      )}
    </>
  );
};

export interface SelectionBookCarouselProps {
  items: MdBook[]; // Fixme Md 타입 말고 comics UserPreferredSection 타입이 API 결과로 오는데 이 부분 확인해야 함
  isAIRecommendation: boolean;
  genre: string;
  type: DisplayType;
  isIntersecting?: boolean;
  bookFetching?: boolean;
}

export const SelectionBookLoading: React.FC<SelectionBookCarouselProps> = props => {
  const { isIntersecting, genre, type } = props;
  return (
    <ul
      css={css`
        display: flex;
        padding-bottom: 48px;
        padding-left: 18px;
        ${orBelow(
          BreakPoint.LG,
          css`
            padding-left: 13px;
          `,
        )}
      `}>
      {props.items.map((book, index) => (
        <PortraitBook key={index}>
          <ThumbnailWrapper>
            <ThumbnailRenderer
              book={{ b_id: book.b_id, detail: book.detail }}
              imgSize={'xxlarge'}
              isIntersecting={isIntersecting}
            />
          </ThumbnailWrapper>
          {book.detail && (
            <BookMeta
              showTag={['bl', 'bl-serial'].includes(genre)}
              book={book.detail}
              showRating={type === DisplayType.HomeMdSelection}
              ratingInfo={book.rating}
            />
          )}
        </PortraitBook>
      ))}
    </ul>
  );
};

interface SectionTitleProps {
  type: DisplayType;
  categoryId?: number;
  title: string;
}

const SectionTitleRenderer: React.FC<SectionTitleProps> = props => {
  const { type, categoryId, title } = props;
  const { items: categories, isFetching: isCategoryFetching } = useSelector(
    (state: RootState) => state.categories,
  );

  const isShowCategoryName = type === DisplayType.UserPreferredBestseller && !!categoryId;
  if (isShowCategoryName && categories[categoryId]) {
    return (
      !isCategoryFetching && <span>{categories[categoryId].name ?? ''} 베스트셀러</span>
    );
  }
  return <span>{title}</span>;
};

const SelectionBook: React.FC<SelectionBookProps> = props => {
  const { genre, type, categoryId, title, extra, option } = props;
  const [, setMounted] = useState(false);

  const [books, isFetching] = useBookDetailSelector(props.items) as [MdBook[], boolean];

  useEffect(() => {
    setMounted(true);
    if (option.isAIRecommendation) {
      // Todo
    }
  }, []);

  // Todo
  // const handleExceptAIRecommendation = (bId: string) => {
  //
  // }
  const targetRef = useRef(null);
  const isIntersecting = useIntersectionObserver(targetRef, '50px');

  return (
    <SectionWrapper ref={targetRef}>
      <SectionTitle>
        {extra?.detail_link ? (
          // Todo Refactor
          <a
            css={css`
              display: flex;
            `}
            href={extra.detail_link}>
            <span>{props.title}</span>
            <span
              css={css`
                margin-left: 7.8px;
              `}>
              <ArrowV />
            </span>
          </a>
        ) : (
          <SectionTitleRenderer type={type} categoryId={categoryId} title={title} />
        )}
      </SectionTitle>
      {!isIntersecting || isFetching ? (
        <SelectionBookLoading
          genre={genre}
          type={type}
          isIntersecting={isIntersecting}
          isAIRecommendation={props.option.isAIRecommendation}
          items={books.slice(0, 6)}
        />
      ) : (
        <WindowWidthQuery>
          <View maxWidth={1000}>
            <SelectionBookList
              isIntersecting={isIntersecting}
              type={type}
              genre={genre}
              isAIRecommendation={props.option.isAIRecommendation}
              items={books}
            />
          </View>
          <View>
            <SelectionBookCarousel
              type={type}
              isIntersecting={isIntersecting}
              genre={genre}
              isAIRecommendation={props.option.isAIRecommendation}
              items={books}
              bookFetching={isFetching}
            />
          </View>
        </WindowWidthQuery>
      )}
    </SectionWrapper>
  );
};

export default SelectionBook;
