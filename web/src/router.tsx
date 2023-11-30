import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

export const siteMap = {
	Homepage: {
		path: "/",
		component: React.lazy(() => import("./pages/Homepage")),
	},
	CheckersRoom: {
		path: "/room/:roomId",
		component: React.lazy(() => import("./pages/CheckersRoom"))
  }
}

const routes = Object.values(siteMap).map(route => {
	const RouteComponent = route.component;
    const Component = (props: Record<string, string>) => <RouteComponent {...props} />

    return <Route path={route.path} Component={Component} />
})

const router = createBrowserRouter(
	createRoutesFromElements(
		routes
	)
);

export default router
  