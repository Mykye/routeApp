import React, { createContext, ReactNode, useState } from 'react';

export interface Marker {
  latitude: number;
  longitude: number;
}

export interface Route {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  length: string;
  markers: Marker[];
  isFavorite: boolean;
}

export interface RouteContextType {
  routes: Route[];
  toggleFavorite: (id: string, isFavorite: boolean) => void;
  addRoute: (route: Route) => void;
  deleteRoute: (id: string) => void;
}

export const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  const addRoute = (newRoute: Route) => {
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
  };

  const toggleFavorite = (routeId: string, isFavorite: boolean) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === routeId ? { ...route, isFavorite } : route
      )
    );
  };

  const deleteRoute = (id: string) => {
    setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
  };

  return (
    <RouteContext.Provider value={{ routes, addRoute, toggleFavorite, deleteRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
