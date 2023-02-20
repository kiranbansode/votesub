const getLastVisitedRoute = () => {
    const ROUTE_KEY = 'lastVisitedRoute';
    const lastVisitedRoute = localStorage.getItem(ROUTE_KEY);

    if (!lastVisitedRoute) {
        return '/';
    }

    return lastVisitedRoute;
};

export default getLastVisitedRoute;
