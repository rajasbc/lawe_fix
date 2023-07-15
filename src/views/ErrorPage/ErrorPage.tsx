import React from "react";
import Header from "../../components/Header/Header";
import {HeaderLinks} from "../../components/Header/HeaderLinks";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

export default function ErrorPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  return (
    <div>
      <Header links={<HeaderLinks />} fixed color="primary" />
      <div>
        <div>
          <GridContainer>
            <GridItem md={12}>
              <h1>404</h1>
              <h2>Page not found :(</h2>
              <h4>
                Ooooups! Looks like you got lost.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
