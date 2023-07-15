import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextField

} from "@material-ui/core";
import { PracticingCourtAutoSuggest } from "../../components/AutoSuggest/react-autosuggest";
import "./LawyerList.scss";

export function FixedContainer(props:any) {
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [court, setCourt] = useState([]);
  const [subProductList, setSubProductList] = useState([]);
  const [productList, setProductList] = useState(props.data.lawCategory);
  const [isValidProduct, setIsValidProduct] = useState(true);
  const [isValidSubProduct, setIsValidSubProduct] = useState(true);
  const [isValidCourt, setIsValidCourt] = useState(true);
  const [isValidArea, setIsValidArea] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);

  useEffect(() => {
    setSubProductList(props.data.subCategory);
  }, [props.data.subCategory]);

  useEffect(() => {
    setProductList(props.data.lawCategory);
  }, [props.data.lawCategory]);

  const handleProductChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProduct(event.target.value as string);
    setIsValidProduct(true);
    const parentId = productList.find((pro) => pro.name === event.target.value);
    props.data.commonActions.getLawCategoryById({ id: parentId?.id });
    setSubProductList(props.data.subCategory);
  };

  const handleSubProductChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setIsValidSubProduct(true);
    setSubProduct(event.target.value as string);
  };

  const handleCourtChange = (court: any) => {
    setIsValidCourt(true);
    setCourt((prevState)=>[...prevState,court]);
  };
  const handleAreaChange = ( event: React.ChangeEvent<{ value: unknown }>
    ) => {
    setIsValidArea(true);
    setArea(event.target.value as string)  };
  const handleCityChange = ( event: React.ChangeEvent<{ value: unknown }>
    ) => {
    setIsValidCity(true);
    setCity(event.target.value as string);
  };


  // const handleLocationChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   console.log("str-----", event.target.value);
  //   const str = (event.target.value as string)?.split(",");
  //   if (str.length == 2) {
  //     setIsValidLocation(true);
  //     setLocation(event.target.value as string);
  //   } else {
  //     setIsValidLocation(false);
  //   }
  // };
  const handleClearFilter = () => {
    setProduct("");
    setSubProduct("");
    setArea("");
    setCity("");
    setCourt([]);
    setIsValidProduct(true);
    setIsValidSubProduct(true);
    setIsValidCourt(true);
    setIsValidArea(true);
    setIsValidCity(true);
  };

  const handleFindLawyer = () => {
    let isFormValid = true;
    if (product === "") {
      setIsValidProduct(false);
    }
    if (subProduct === "") {
      isFormValid = false;
      setIsValidSubProduct(false);
    }
    if (court.length === 0) {
      isFormValid = false;
      setIsValidCourt(false);
    }
    // if (area === "") {
    //   isFormValid = false;
    //   setIsValidArea(false);
    // }
    if (city === "") {
      isFormValid = false;
      setIsValidCity(false);
    }
    if (isFormValid) {
      // const loc = location ? location.split(",")[0]?.trim() : "";
      // const city = location ? location.split(",")[1]?.trim() : "";

      const data = {
        product: product,
        subproduct: subProduct,
        practisingcourt: court.join(","),
        description: "",
        location:area,
        city: city,
        skip: 0,
        limit: 10,
      };
      props.data.findLawyerActions.findLawyerAction(data);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Grid>
          <Grid item xs={12} justify="center" style={{background:"white",borderRadius:"25px",margin:"3rem 1rem"}}>
            <table cellPadding="15" style={{
              width:"100%"
            }
            }>
              <tr>
                <td>
                  Filters
                </td>
              </tr>
              <tr >
                <td>
                  <PracticingCourtAutoSuggest
                    label="Court*"
                    variant="outlined"
                    fullWidth
                    handleInputChange={handleCourtChange}
                    allowDuplicates={false}
                    error={!isValidCourt} placeholder={""}                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormControl variant="outlined" className="text-field" style={{ width: "100%" }}>
                    <InputLabel
                      error={!isValidProduct}
                      id="product-select-label"
                      className="select-lable"
                    >
                      Product*
                    </InputLabel>

                    <Select
                      native
                      className="select-input-modify"
                      labelId="product-select-label"
                      id="product-select-outlined"
                      value={product}
                      onChange={handleProductChange}
                      label="Product*"
                      error={!isValidProduct}
                      placeholder="Product"
                      fullWidth
                      style={{width:"100%"}}
                    >
                       <option aria-label="None" value="" />
                      {productList?.map((eachProduct) => {
                        return (
                          <option value={eachProduct.name}>
                            {eachProduct.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>

                <td>
                  <FormControl variant="outlined" className="text-field" style={{ width: "100%" }}>
                    <InputLabel
                      error={!isValidSubProduct}
                      id="sub-product-select-label"
                      className="select-lable"
                    >
                      Sub Product*
                    </InputLabel>
                    <Select
                      native
                      className="select-input-modify"
                      labelId="sub-product-select-label"
                      id="sub-product-select-outlined"
                      value={subProduct}
                      onChange={handleSubProductChange}
                      label="Sub Product*"
                      error={!isValidSubProduct}
                      placeholder="Sub Product"
                      fullWidth
                      style={{width:"100%"}}

                    >
                       <option aria-label="None" value="" />
                      {subProductList?.map((eachSubProduct) => {
                        return (
                          <option value={eachSubProduct.name}>
                            {eachSubProduct.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    className="location-text-field"
                    error={!setIsValidArea}
                    onChange={handleAreaChange}
                    label="Area"
                    placeholder="Area"
                    variant="outlined"
                    helperText={
                      !setIsValidArea
                        ? "Enter a valid format  Area"
                        : ""
                    }
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    className="location-text-field"
                    error={!setIsValidCity}
                    onChange={handleCityChange}
                    label="City*"
                    placeholder="City"
                    variant="outlined"
                    helperText={
                      !setIsValidCity
                        ? "Enter a valid format  City"
                        : ""
                    }
                    fullWidth
                  />
                </td>
              </tr>
              <tr>

                <td>
                  <div className="pagination-card">
                    <Button
                      variant="contained"
                      className="connect-btn"
                      onClick={handleFindLawyer}
                    >
                      Modify Search
                    </Button>
                  </div>
                </td>
                {/* <td>
                  <div className="pagination-card">
                    <Button
                      variant="contained"
                      className="connect-btn"
                      onClick={handleClearFilter}
                    >
                      clear
                    </Button>
                  </div>
                </td> */}
              </tr>
            </table>
          </Grid>
        </Grid>
      </div>
    </React.Fragment >
  );
}