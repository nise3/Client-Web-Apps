import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
  useLocalizedAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_BANNERS,
  API_CALENDAR_EVENTS,
  API_CMS_GLOBAL_CONFIG,
  API_FAQS,
  API_GALLERY_ALBUM_CONTENTS,
  API_GALLERY_ALBUMS,
  API_NISE_PUBLICATIONS,
  API_NOTICE_OR_NEWSES,
  API_PARTNERS,
  API_PUBLIC_CALENDAR_EVENTS,
  API_PUBLIC_FAQ,
  API_PUBLIC_GALLERY_ALBUM_CONTENTS,
  API_PUBLIC_GALLERY_ALBUMS,
  API_PUBLIC_NISE_STATICS,
  API_PUBLIC_NOTICE_OR_NEWS,
  API_PUBLIC_PARTNERS,
  API_PUBLIC_PUBLICATIONS,
  API_PUBLIC_RECENT_ACTIVITIES,
  API_PUBLIC_SLIDERS,
  API_PUBLIC_STATIC_PAGE_BLOCKS,
  API_RECENT_ACTIVITIES,
  API_SLIDERS,
  API_STATIC_PAGE_TYPES,
  API_VISITOR_FEEDBACKS,
} from '../../@softbd/common/apiRoutes';

export function useFetchSliders(params: any) {
  return useAxiosSWR([API_SLIDERS, params]);
}

export function useFetchSlider(sliderId: number | null) {
  return useAxiosSWR(sliderId ? API_SLIDERS + '/' + sliderId : null);
}

export function useFetchSliderBanners(params: any) {
  return useAxiosSWR([API_BANNERS, params]);
}

export function useFetchStaticPageBlock(pageCode: any, params: any) {
  return useLocalizedAxiosSWR(
    pageCode ? [API_PUBLIC_STATIC_PAGE_BLOCKS + pageCode, params] : null,
  );
}

export function useFetchSliderBanner(bannerId: number | null) {
  return useAxiosSWR(bannerId ? API_BANNERS + '/' + bannerId : null);
}

export function useFetchStaticPageTypes(params: any) {
  return useAxiosSWR([API_STATIC_PAGE_TYPES, params]);
}

export function useFetchRecentActivity(recentActivityId: number | null) {
  return useAxiosSWR(
    recentActivityId ? API_RECENT_ACTIVITIES + '/' + recentActivityId : null,
  );
}

export function useFetchPublicRecentActivities(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_RECENT_ACTIVITIES, params]);
}

export function useFetchPublicRecentActivityDetails(itemId: any) {
  return useLocalizedAxiosSWR(
    itemId ? API_PUBLIC_RECENT_ACTIVITIES + '/' + itemId : null,
  );
}

export function useFetchNoticeOrNews(itemId: number | null) {
  return useAxiosSWR(itemId ? API_NOTICE_OR_NEWSES + '/' + itemId : null);
}

/** fetches CMS Global Config */
export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIG);
}

export function useFetchPartners(params: any) {
  return useAxiosSWR([API_PARTNERS, params]);
}

export function useFetchPublicPartners(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_PARTNERS, params]);
}

export function useFetchPartner(partnerId: number | null) {
  return useAxiosSWR(partnerId ? API_PARTNERS + '/' + partnerId : null);
}

/******* For Gallery Albums ******/
export function useFetchGalleryAlbums(params: any) {
  return useAxiosSWR([API_GALLERY_ALBUMS, params]);
}

export function useFetchPublicGalleryAlbums(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_GALLERY_ALBUMS, params]);
}

export function useFetchGalleryAlbum(galleryAlbumId: number | null) {
  return useAxiosSWR(
    galleryAlbumId ? API_GALLERY_ALBUMS + '/' + galleryAlbumId : null,
  );
}

export function useFetchPublicGalleryAlbum(galleryAlbumId: number | null) {
  return useLocalizedAxiosSWR(
    galleryAlbumId ? API_PUBLIC_GALLERY_ALBUMS + '/' + galleryAlbumId : null,
  );
}

/****** For Gallery Album Contents ******/
export function useFetchGalleryAlbumContents(params: any) {
  return useAxiosSWR([API_GALLERY_ALBUM_CONTENTS, params]);
}

export function useFetchPublicGalleryAlbumContents(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_GALLERY_ALBUM_CONTENTS, params]);
}

export function useFetchGalleryAlbumContent(
  galleryAlbumContentId: number | null,
) {
  return useAxiosSWR(
    galleryAlbumContentId
      ? API_GALLERY_ALBUM_CONTENTS + '/' + galleryAlbumContentId
      : null,
  );
}

export function useFetchPublicGalleryAlbumContent(
  galleryAlbumContentId: number | null,
) {
  return useLocalizedAxiosSWR(
    galleryAlbumContentId
      ? API_PUBLIC_GALLERY_ALBUM_CONTENTS + '/' + galleryAlbumContentId
      : null,
  );
}

export function useFetchCalenderEvents(params: any) {
  // console.log('axis: ', params);
  return useAxiosSWR([API_CALENDAR_EVENTS, params]);
}

export function useFetchPublicCalenderEvents(params: any) {
  // console.log('axis: ', params);
  return useLocalizedAxiosSWR([API_PUBLIC_CALENDAR_EVENTS, params]);
}

/** fetches a single calendar event */
export function useFetchCalendarEvent(eventId: number | null | undefined) {
  return useAxiosSWR(eventId ? API_CALENDAR_EVENTS + '/' + eventId : null);
}

export function useFetchPublicNoticeOrNewses(params: any) {
  return useLocalizedAxiosSWR(
    params ? [API_PUBLIC_NOTICE_OR_NEWS, params] : null,
  );
}

export function useFetchPublicNoticeOrNews(noticeId: number | null) {
  return useLocalizedAxiosSWR(
    noticeId ? API_PUBLIC_NOTICE_OR_NEWS + '/' + noticeId : null,
  );
}

export function useFetchPublicSliders(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_SLIDERS, params]);
}

export function useFetchFAQ(faqId: number | null) {
  return useAxiosSWR(faqId ? API_FAQS + '/' + faqId : null);
}

export function useFetchPublicFAQ(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_FAQ, params]);
}

export function useFetchVisitorFeedback(visitorId: number | null) {
  return useAxiosSWR(
    visitorId ? API_VISITOR_FEEDBACKS + '/' + visitorId : null,
  );
}

export function useFetchNiseStatics() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_NISE_STATICS);
}

export function useFetchPublications(params: any) {
  return useAxiosSWR([API_NISE_PUBLICATIONS, params]);
}
export function useFetchPublicPublications(params: any) {
  return useLocalizedAxiosSWR([API_PUBLIC_PUBLICATIONS, params]);
}

export function useFetchPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId ? API_NISE_PUBLICATIONS + '/' + publicationId : null,
  );
}

export function useFetchPublicPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId ? API_PUBLIC_PUBLICATIONS + '/' + publicationId : null,
  );
}
