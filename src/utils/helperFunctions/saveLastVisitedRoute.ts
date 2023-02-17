const saveLastVisitedRoute = (route: string) => {
    const ROUTE_KEY = 'lastVisitedRoute';

    // If some user navigated to error page, it will now be saved
    if (route === '/error') return;

    localStorage.setItem(ROUTE_KEY, route);
};

export default saveLastVisitedRoute;
