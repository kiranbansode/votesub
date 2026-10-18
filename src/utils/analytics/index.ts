/**
 * Pushes events to the GTM dataLayer. GTM must have a Google tag for the initial
 * page view, plus a GA4 Event tag for each custom event below.
 *
 * page_view, login, sign_up, vote_cast, subject_created, feedback_submit
 */

type TAnalyticsValue = string | number | boolean;

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

const USER_CATEGORY_LABELS: Record<string, string> = {
    st: 'student',
    tr: 'teacher',
    hr: 'employer',
    dev: 'developer',
};

export const trackEvent = (event: string, params: Record<string, TAnalyticsValue> = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event,
        ...params,
    });
};

export const trackPageView = (pagePath: string) => {
    trackEvent('page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
    });
};

export const userCategoryLabel = (category: string) => USER_CATEGORY_LABELS[category] ?? category;
