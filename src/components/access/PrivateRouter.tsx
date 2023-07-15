import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { AppUser } from "../Common/AppUser";
import { ErrorBoundary } from "../Common/ErrorBoundary";
import { hasAccess } from "./hasAccess";

export interface IPrivateRouteProps extends RouteProps {
    user?: AppUser;
    usersWhoCan?: string; 
}

export const PrivateRoute = ({ component: Component, usersWhoCan, user, ...rest }: IPrivateRouteProps) => {
  return (
      <ErrorBoundary>
        <Route
          {...rest }
            render={(props:RouteComponentProps) =>
              hasAccess(usersWhoCan, user?.role, user?.islogedin)
                    ? <Component {...props} />
                    : <Redirect
                    to={{
                      pathname: "/login-page",
                    }}
                  />                         }
        />
       </ErrorBoundary>        
    );
};

