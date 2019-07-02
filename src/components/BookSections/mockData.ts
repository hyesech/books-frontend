import { BookSection } from 'src/components/BookSections/BookSectionContainer';

export default [
  {
    type: 'ranking',
    title: '베스트셀러',
    option: { type: 'big' },
    items: [
      {
        bId: '297021296',
        imageUrl: '',
        title: '[연재] 다이아몬드 더스트',
        author: '김다윗',
        avgRating: 3.5,
        totalReviewer: 200,
        tag: 'novel',
      },
      {
        bId: '2259000726',
        imageUrl: '',
        title: '[연재] 레인보우 시티',
        author: '김다윗',
        isAdult: true,
        avgRating: 2.2,
        totalReviewer: 21231,
        tag: 'novel',
      },
      {
        bId: '3684000001',
        imageUrl: '',
        title: '[연재] 악역 서브수가 살아남는 방법',
        author: '김다윗',
        avgRating: 0.5,
        totalReviewer: 121231,
        tag: 'novel',
      },
      {
        bId: '3425000001',
        imageUrl: '',
        title: '[연재] 인터미션',
        author: '그루',
        avgRating: 4.7,
        totalReviewer: 1,
        tag: 'novel',
      },
      {
        bId: '2183001015',
        imageUrl: '',
        title: '[연재] 갈라테이아',
        author: '그웬돌린',
        avgRating: 3.3,
        totalReviewer: 1211,
        tag: 'novel',
      },
      {
        bId: '297020117',
        imageUrl: '',
        title: '[연재] 비의도적 연애담',
        author: '김다윗',
        avgRating: 4,
        totalReviewer: 1211,
        tag: 'novel',
      },
      {
        bId: '111017017',
        imageUrl: '',
        title: '[웹툰] 백도사의 사건수첩 (드림 메이커 스핀오프)',
        author: '김다윗',
        avgRating: 3,
        totalReviewer: 1211,
        tag: 'comic',
      },
      {
        bId: '945050921',
        imageUrl: '',
        title: '[웹툰] 재생',
        author: '재이',
        avgRating: 2,
        totalReviewer: 1211,
        tag: 'comic',
      },
      {
        bId: '3580000001',
        imageUrl: '',
        title: '[웹툰] 하트 이펙트',
        author: '알카',
        avgRating: 1.5,
        totalReviewer: 1211,
        tag: 'comic',
      },
    ],
  },
  {
    type: 'ranking',
    option: { type: 'small' },
    items: [
      { bId: '297021296', imageUrl: '', title: '[연재] 다이아몬드 더스트', author: '김다윗' },
      { bId: '2259000726', imageUrl: '', title: '[연재] 레인보우 시티', author: '김다윗' },
      {
        bId: '3684000001',
        imageUrl: '',
        title: '[연재] 악역 서브수가 살아남는 방법',
        author: '김다윗',
      },
      { bId: '3425000001', imageUrl: '', title: '[연재] 인터미션', author: '그루' },
      { bId: '2183001015', imageUrl: '', title: '[연재] 갈라테이아', author: '그웬돌린' },
      { bId: '297020117', imageUrl: '', title: '[연재] 비의도적 연애담', author: '김다윗' },
      {
        bId: '111017017',
        imageUrl: '',
        title: '[웹툰] 백도사의 사건수첩 (드림 메이커 스핀오프)',
        author: '김다윗',
      },
      { bId: '945050921', imageUrl: '', title: '[웹툰] 재생', author: '재이' },
      { bId: '3580000001', imageUrl: '', title: '[웹툰] 하트 이펙트', author: '알카' },
    ],
  },
  {
    type: 'selection',
    title: '오늘, 리디의 발견',
    option: { isAIRecommendation: false },
    items: [
      {
        bId: '297021296',
        imageUrl: '',
        title: '[연재] 다이아몬드 더스트',
        author: '김다윗',
        avgRating: 3.5,
        totalReviewer: 200,
        tag: 'novel',
      },
      {
        bId: '2259000726',
        imageUrl: '',
        title: '[연재] 레인보우 시티',
        author: '김다윗',
        isAdult: true,
        avgRating: 2.2,
        totalReviewer: 21231,
        tag: 'novel',
      },
      {
        bId: '3684000001',
        imageUrl: '',
        title: '[연재] 악역 서브수가 살아남는 방법',
        author: '김다윗',
        avgRating: 0.5,
        totalReviewer: 121231,
        tag: 'novel',
      },
      {
        bId: '3425000001',
        imageUrl: '',
        title: '[연재] 인터미션',
        author: '그루',
        avgRating: 4.7,
        totalReviewer: 1,
        tag: 'novel',
      },
      {
        bId: '2183001015',
        imageUrl: '',
        title: '[연재] 갈라테이아',
        author: '그웬돌린',
        avgRating: 3.3,
        totalReviewer: 1211,
        tag: 'novel',
      },
      {
        bId: '297020117',
        imageUrl: '',
        title: '[연재] 비의도적 연애담',
        author: '김다윗',
        avgRating: 4,
        totalReviewer: 1211,
        tag: 'novel',
        isSomeDeal: true,
      },
      {
        bId: '111017017',
        imageUrl: '',
        title: '[웹툰] 백도사의 사건수첩 (드림 메이커 스핀오프)',
        author: '김다윗',
        avgRating: 3,
        totalReviewer: 1211,
        tag: 'comic',
      },
      {
        bId: '945050921',
        imageUrl: '',
        title: '[웹툰] 재생',
        author: '재이',
        avgRating: 2,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
      {
        bId: '3580000001',
        imageUrl: '',
        title: '[웹툰] 하트 이펙트',
        author: '알카',
        avgRating: 1.5,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
    ],
  },
  {
    type: 'selection',
    title: '추천 섹션',
    option: {
      isAIRecommendation: true,
    },
    items: [
      {
        bId: '297021296',
        imageUrl: '',
        title: '[연재] 다이아몬드 더스트',
        author: '김다윗',
        avgRating: 3.5,
        totalReviewer: 200,
        tag: 'novel',
      },
      {
        bId: '2259000726',
        imageUrl: '',
        title: '[연재] 레인보우 시티',
        author: '김다윗',
        isAdult: true,
        avgRating: 2.2,
        totalReviewer: 21231,
        tag: 'novel',
      },
      {
        bId: '3684000001',
        imageUrl: '',
        title: '[연재] 악역 서브수가 살아남는 방법',
        author: '김다윗',
        avgRating: 0.5,
        totalReviewer: 121231,
        tag: 'novel',
      },
      {
        bId: '3425000001',
        imageUrl: '',
        title: '[연재] 인터미션',
        author: '그루',
        avgRating: 4.7,
        totalReviewer: 1,
        tag: 'novel',
      },
      {
        bId: '2183001015',
        imageUrl: '',
        title: '[연재] 갈라테이아',
        author: '그웬돌린',
        avgRating: 3.3,
        totalReviewer: 1211,
        tag: 'novel',
      },
      {
        bId: '297020117',
        imageUrl: '',
        title: '[연재] 비의도적 연애담',
        author: '김다윗',
        avgRating: 4,
        totalReviewer: 1211,
        tag: 'novel',
        isSomeDeal: true,
      },
      {
        bId: '111017017',
        imageUrl: '',
        title: '[웹툰] 백도사의 사건수첩 (드림 메이커 스핀오프)',
        author: '김다윗',
        avgRating: 3,
        totalReviewer: 1211,
        tag: 'comic',
      },
      {
        bId: '945050921',
        imageUrl: '',
        title: '[웹툰] 재생',
        author: '재이',
        avgRating: 2,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
      {
        bId: '3580000001',
        imageUrl: '',
        title: '[웹툰] 하트 이펙트',
        author: '알카',
        avgRating: 1.5,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
    ],
  },
  {
    type: 'selection',
    title: '[만화] 이 만화를 주목하세요!',
    option: {
      isAIRecommendation: false,
    },
    items: [
      {
        bId: '2404000282',
        imageUrl: '',
        title: '[웹툰] 은퇴한 히어로',
        author: '시루미',
        avgRating: 4.7,
        totalReviewer: 32,
        tag: 'comic',
      },
      {
        bId: '3426000009',
        imageUrl: '',
        title: '[웹툰] Kiss the bride',
        author: '멸치',
        isAdult: true,
        avgRating: 4.5,
        totalReviewer: 701,
        tag: 'novel',
      },
      {
        bId: '1239007377',
        imageUrl: '',
        title: '[연재] 이에스씨 (ESC)',
        author: '시아',
        avgRating: 4.5,
        totalReviewer: 753,
        tag: 'comic',
      },
      {
        bId: '3684000001',
        imageUrl: '',
        title: '[연재] 악역 서브수가 살아남는 방법',
        author: '그루',
        avgRating: 4.7,
        totalReviewer: 21,
        tag: 'novel',
      },
      {
        bId: '2183001015',
        imageUrl: '',
        title: '[연재] 갈라테이아',
        author: '그웬돌린',
        avgRating: 3.3,
        totalReviewer: 1211,
        tag: 'novel',
      },
      {
        bId: '297020117',
        imageUrl: '',
        title: '[연재] 비의도적 연애담',
        author: '김다윗',
        avgRating: 4,
        totalReviewer: 1211,
        tag: 'novel',
        isSomeDeal: true,
      },
      {
        bId: '111017017',
        imageUrl: '',
        title: '[웹툰] 백도사의 사건수첩 (드림 메이커 스핀오프)',
        author: '김다윗',
        avgRating: 3,
        totalReviewer: 1211,
        tag: 'comic',
      },
      {
        bId: '945050921',
        imageUrl: '',
        title: '[웹툰] 재생',
        author: '재이',
        avgRating: 2,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
      {
        bId: '3580000001',
        imageUrl: '',
        title: '[웹툰] 하트 이펙트',
        author: '알카',
        avgRating: 1.5,
        totalReviewer: 1211,
        tag: 'comic',
        isSomeDeal: true,
      },
    ],
  },
] as BookSection[];
