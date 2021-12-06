import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_BANNERS,
  API_CALENDAR_EVENTS,
  API_CMS_GLOBAL_CONFIG,
  API_GALLERY_ALBUM_CONTENTS,
  API_GALLERY_ALBUMS,
  API_PARTNERS,
  API_PUBLIC_GALLERY_ALBUM_CONTENTS,
  API_PUBLIC_GALLERY_ALBUMS,
  API_PUBLIC_NOTICE_OR_NEWS,
  API_PUBLIC_PARTNERS,
  API_SLIDERS,
  API_STATIC_PAGE_TYPES,
  CMS_NOTICE_OR_NEWS,
  CMS_RECENT_ACTIVITY,
  PUBLIC_API_SLIDERS,
} from '../../@softbd/common/apiRoutes';

/*export function useFetchVisitorFeedbacks(params: any) {
  return useAxiosSWR([API_VISITOR_FEEDBACKS, params]);
}*/

export function useFetchSliders(params: any) {
  return useAxiosSWR([API_SLIDERS, params]);
}

export function useFetchSlider(sliderId: number | null) {
  return useAxiosSWR(sliderId ? API_SLIDERS + '/' + sliderId : null);
}

export function useFetchSliderBanners(params: any) {
  return useAxiosSWR([API_BANNERS, params]);
}

export function useFetchSliderBanner(bannerId: number | null) {
  return useAxiosSWR(bannerId ? API_BANNERS + '/' + bannerId : null);
}

export function useFetchStaticPageTypes(params: any) {
  return useAxiosSWR([API_STATIC_PAGE_TYPES, params]);
}

export function useFetchRecentActivity(recentActivityId: number | null) {
  return useAxiosSWR(
    recentActivityId ? CMS_RECENT_ACTIVITY + '/' + recentActivityId : null,
  );
}

export function useFetchNoticeOrNews(itemId: number | null) {
  return useAxiosSWR(itemId ? CMS_NOTICE_OR_NEWS + '/' + itemId : null);
}

/** fetches CMS Global Config */
export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIG);
}

export function useFetchPartners(params: any) {
  return useAxiosSWR([API_PARTNERS, params]);
}

export function useFetchPublicPartners(params: any) {
  return useAxiosSWR([API_PUBLIC_PARTNERS, params]);
}

export function useFetchPartner(partnerId: number | null) {
  return useAxiosSWR(partnerId ? API_PARTNERS + '/' + partnerId : null);
}

/******* For Gallery Albums ******/
export function useFetchGalleryAlbums(params: any) {
  return useAxiosSWR([API_GALLERY_ALBUMS, params]);
}

export function useFetchPublicGalleryAlbums(params: any) {
  return useAxiosSWR([API_PUBLIC_GALLERY_ALBUMS, params]);
}

export function useFetchGalleryAlbum(galleryAlbumId: number | null) {
  return useAxiosSWR(
    galleryAlbumId ? API_GALLERY_ALBUMS + '/' + galleryAlbumId : null,
  );
}

export function useFetchPublicGalleryAlbum(galleryAlbumId: number | null) {
  return useAxiosSWR(
    galleryAlbumId ? API_PUBLIC_GALLERY_ALBUMS + '/' + galleryAlbumId : null,
  );
}

/****** For Gallery Album Contents ******/
export function useFetchGalleryAlbumContents(params: any) {
  return useAxiosSWR([API_GALLERY_ALBUM_CONTENTS, params]);
}

export function useFetchPublicGalleryAlbumContents(params: any) {
  return useAxiosSWR([API_PUBLIC_GALLERY_ALBUM_CONTENTS, params]);
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
  return useAxiosSWR(
    galleryAlbumContentId
      ? API_PUBLIC_GALLERY_ALBUM_CONTENTS + '/' + galleryAlbumContentId
      : null,
  );
}

export function useFetchCalenderEvents(params: any) {
  // console.log('axis: ', params);
  return useAxiosSWR([API_CALENDAR_EVENTS, params]);
}

/** fetches a single calendar event */
export function useFetchCalendarEvent(eventId: number | null | undefined) {
  // return useAxiosSWR(faqId ? API_CALENDAR_EVENTS + '/' + eventId : null);
  return useAxiosSWR([API_CALENDAR_EVENTS + '/' + eventId]);
}

export function useFetchPublicNoticeOrNewses(params: any) {
  return useAxiosSWR([API_PUBLIC_NOTICE_OR_NEWS, params]);
}

export function useFetchPublicNoticeOrNews(noticeId: number | null) {
  return useAxiosSWR(
    noticeId ? API_PUBLIC_NOTICE_OR_NEWS + '/' + noticeId : null,
  );
}

export function useFetchPublicSliders(params: any) {
  return useAxiosSWR([PUBLIC_API_SLIDERS, params]);
}
