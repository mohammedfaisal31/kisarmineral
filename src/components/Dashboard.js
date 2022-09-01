import { useState } from "react";
import Navbar from "./Navbar";
import Tools from "./Tools";
import {
  TextField,
  Button
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import SelectWrapper from "./SelectWrapper";
import SelectWrapperWithTextField from "./SelectWrapperWithTextField";
import uuid from "react-uuid";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import VisitorPropsContext from "../context/VisitorPropsContext";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CSVModal from "./CSVModal.js";

import QRCodeWrap from "./QRCodeWrap";
import {object,string} from "yup";
import "../App.css";


export default function Dashboard() {
  const [display_register_modal, setDisplay_register_modal] = useState("none");
  const [modal_section] = useState("");
  const [modal_height] = useState("fit-content");
  const [displayAlert, setIfDisplayAlert] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const[showQRCode,setShowQRCode] = useState(false);
  const[openCSVModal,setOpenCSVModal] = useState(false);
  
  
  const handleCloseRegisterForm = () => {
    setDisplay_register_modal("none");
  };
  const getDisplayStatus = (message) => {
    setDisplay_register_modal(message);
  };
  const visitorPropsHandler = useContext(VisitorPropsContext);

  const handleEntrySuccess = (values) => {
    visitorPropsHandler.updateVisitorProps(values); //updates the QR code data through Context API
    setOpenBackDrop(false);
    setShowQRCode(true);
  };
  const handleEntryFail = () => {
    setOpenBackDrop(false);
    setIfDisplayAlert(true);
  };
  const showOpenCSVModal = (message)=>{
    setOpenCSVModal(message);
  }

  const handleEntrySubmit = (values) => {
    setIfDisplayAlert(false);
    setOpenBackDrop(true);
    const uid = uuid();
    let temp_visitor_id = uid.slice(0, uid.indexOf("-"));
    if (temp_visitor_id.length > 10)
      temp_visitor_id = `${Math.floor(
        Math.random() * 9 + 1
      ).toString()}${Math.floor(Math.random() * 9 + 1).toString()}${Math.floor(
        Math.random() * 9 + 1
      ).toString()}${Math.floor(Math.random() * 9 + 1).toString()}${Math.floor(
        Math.random() * 9 + 1
      ).toString()}`;
    values.visitor_id = temp_visitor_id;
    axios
      .post("https://kisargo-api.tk/api/registerVisitor", values)
      .then((result) =>{
        result.data === "ROW_INSERTED"
          ? handleEntrySuccess(values)
          : result.data === "DUP_ENTRY"
          ? handleEntryFail()
          : alert("Unknown error")
        setOpenBackDrop(false);
        }
      )
      .catch();
  };

  const initialValues = {
    name: "",
    email: "",
    registration_number: "",
    phone_number: "",
    visitor_type: "",
    conference_day: "",
    if_sponsored: "",
    sponsor_name: "",
    amount_paid: "",
    payment_method: "",
    upi_number: "",
  };
  return (
    <>
      <Navbar />
      <Tools getDisplayStatusFromTools={[getDisplayStatus,showOpenCSVModal]} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* The below section is of Entry form */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          handleEntrySubmit(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          name:string().required("Name is required").min(3,"Name too short"),
          email:string().required("Email is required").email("Invalid email"),
          phone_number:string().required("Phone is required").matches(/^[0-9]{10}$/,"Invalid number"),
          amount_paid:string().required("Please enter the amount paid").max(10,"Max 10 chars allowed")
      })}
        
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <div className="modal" style={{ display: display_register_modal }}>
              <div className="modal-bg">
                <div className="modal-content" style={{ height: modal_height }}>
                  {!showQRCode ? (
                    <div
                      className="model-content-wrap"
                      style={{ display: modal_section }}
                    >
                      <div className="r-text">
                        <p className="r-text-p">Entry</p>
                        <button
                          type="button"
                          onClick={handleCloseRegisterForm}
                          className="close-btn"
                        >
                          <span className="close">&times;</span>
                        </button>
                      </div>
                      {displayAlert ? (
                        <Alert severity="error">
                          This person already exists
                        </Alert>
                      ) : (
                        <></>
                      )}

                      <div className="form-unit">
                        <Field
                          as={TextField}
                          id="name"
                          name="name"
                          label="Name"
                          placeholder="Enter visitor name"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.name) && Boolean(touched.name)}
                          helperText ={Boolean(touched.name) && errors.name}
                      
                        />
                        <Field
                          as={TextField}
                          id="email"
                          name="email"
                          label="Email"
                          placeholder="Enter visitor email"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.email) && Boolean(touched.email)}
                          helperText ={Boolean(touched.email) && errors.email}
                        />
                        <Field
                          as={TextField}
                          id="reg-no"
                          name="registration_number"
                          label="State Reg number"
                          placeholder="Enter state registration number"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.registration_number) && Boolean(touched.registration_number)}
                          helperText ={Boolean(touched.registration_number) && errors.registration_number}
                        
                        />
                        <Field
                          as={TextField}
                          id="phone"
                          name="phone_number"
                          label="Phone number"
                          placeholder="Enter mobile number"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.phone_number) && Boolean(touched.phone_number)}
                          helperText ={Boolean(touched.phone_number) && errors.phone_number}
                        
                        />
                        <div className="Selectors">
                          <SelectWrapper
                            name="visitor_type"
                            options={{
                              Faculty: "Faculty",
                              Clincian: "Clincian",
                              Embryologist: "Embryologist",
                            }}
                            label="Type of delegate"
                            style={{ width: "47%", marginTop: "15px" }}
                          />
                          <SelectWrapper
                            name="conference_day"
                            options={{
                              "First day conference": "First day conference",
                              "Second day conference": "Second day conference",
                            }}
                            label="Conference day"
                            style={{ width: "47%", marginTop: "15px" }}
                          />
                        </div>
                        <div className="Selectors">
                          <SelectWrapperWithTextField
                            name="if_sponsored"
                            options={{
                              Yes: "Yes",
                              No: "No",
                            }}
                            label="Are they sponsored?"
                            requiredTextField={[
                              "sponsor_name",
                              "Sponsor Name",
                              "Enter Sponsor Name",
                            ]}
                            style={{ width: "47%", marginTop: "15px" }}
                          />
                        </div>
                        <div className="Selectors">
                          <SelectWrapperWithTextField
                            name="payment_method"
                            options={{
                              Cash: "Cash",
                              "UPI/GPay/PhonePe/Paytm":
                                "UPI/GPay/PhonePe/Paytm",
                                "IMojo":"IMojo",
                                "Netbanking":"Netbanking"
                            }}
                            label="Payment method"
                            requiredTextField={[
                              "upi_number",
                              "Transaction ID",
                              "Enter transaction ID",
                            ]}
                            style={{ width: "47%", marginTop: "15px" }}
                        
                          />
                        </div>

                        <Field
                          as={TextField}
                          id="amount_paid"
                          name="amount_paid"
                          label="Amount Paid"
                          placeholder="Enter the amount paid"
                          variant="outlined"
                          style={{ marginTop: "15px" }}
                          error={Boolean(errors.amount_paid) && Boolean(touched.amount_paid)}
                          helperText ={Boolean(touched.amount_paid) && errors.amount_paid}
                      
                        />

                        <Button
                          type="button"
                          variant="outlined"
                          style={{
                            color: "#11acba",
                            borderColor: "#11acba",
                            marginTop: "20px",
                          }}
                        >
                          RESET FORM
                        </Button>
                        <Button
                          type="submit"
                          variant="outlined"
                          style={{
                            color: "#FFF",
                            backgroundColor: "#3abca7",
                            borderColor: "#3abca7",
                            marginTop: "20px",
                          }}
                        >
                          CONFIRM
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="QRCodeWrap">
                          <QRCodeWrap style={{marginTop:"20px"}} className="QRCodeContainer" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* The end of Entry form */}
      {openCSVModal && <CSVModal showMe={[openCSVModal,setOpenCSVModal]}/>}
    </>
  );
}
