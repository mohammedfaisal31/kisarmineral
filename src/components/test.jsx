<div className="form-unit">
                
                <TextField id="name" label="Name" placeholder="Enter visitor name" variant="filled"  style={{marginTop:"10px"}} />
                <TextField id="email" label="Email" placeholder="Enter visitor email" variant="filled" style={{marginTop:"10px"}}/>
                <TextField id="reg-no" label="State Reg number" placeholder="Enter state registration number" variant="filled" style={{marginTop:"10px"}}/>
                <TextField id="phone" label="Phone number" placeholder="Enter mobile number" variant="filled"style={{marginTop:"10px"}} />
            <div className="Selectors">
                
                <FormControl className="drop-down" style={{marginTop:"20px"}}>
                <InputLabel id="visitor-label">Type of delegate</InputLabel>
                    <Select
                        labelId="visitor-type"
                        id="visitor-type"
                        label="visitor"
                        value={visitorType}
                        style={{marginTop:"10px"}}
                        onChange={handleVistorChange}
                        
                    >
                <MenuItem value={10}>Faculty</MenuItem>
                <MenuItem value={20}>Clinician</MenuItem>
                <MenuItem value={30}>Embryologist</MenuItem>
             </Select>
             </FormControl>
             <FormControl className="drop-down" style={{marginTop:"20px"}}>
                <InputLabel id="date-label">Day of conference</InputLabel>
                    <Select
                        labelId="conference-day"
                        id="conference-day"
                        label="conference-day"
                        value={conferenceDay}
                        style={{marginTop:"10px"}}
                        onChange={handleConferenceDayChange}
                        
                    >
                <MenuItem value={10}>First Day Conference</MenuItem>
                <MenuItem value={20}>Second Day Conference</MenuItem>
             </Select>
             </FormControl>
            </div>
            <div className="Selectors-2">
                <FormControl className="drop-down" style={{marginTop:"20px"}}>
                <InputLabel id="sponsored-label">Sponsored</InputLabel>
                    <Select
                        labelId="sponsored"
                        id="sponsored"
                        label="sponsored"
                        value={sponsored}
                        style={{marginTop:"10px"}}
                        onChange={handleSponsoredChange}
                        
                    >
                <MenuItem value={10}>Yes</MenuItem>
                <MenuItem value={20}>No</MenuItem>
             </Select>
             </FormControl>
             <div className="sponsor-text-field"style={{display:if_display_sponsored}}>
                 <TextField id="Sponsor" label="Sponsor" placeholder="Enter sponsor name" variant="standard" />
            
             </div>
            </div>
            <div className="Selectors-2">
            <FormControl className="drop-down" style={{marginTop:"20px"}}>
             <InputLabel id="paid-label">Payment method</InputLabel>
             <Select
                        labelId="paid-label"
                        id="paid"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        style={{marginTop:"10px"}}
                        
                    >
                <MenuItem value={"cash"}>Cash</MenuItem>
                <MenuItem value={"upi"}>UPI/Paytm/G-Pay/PhonePe</MenuItem>
             </Select>
             </FormControl>
             <div className="amount-paid-field">
             <TextField id="amount_paid" label="Amount paid" placeholder="Enter the amount paid" variant="standard"style={{marginTop:"5px",marginLeft:"5px",width:"fit-content"}} />    
             </div>
             </div>
             
              
             
             
             
             <TextField id="upi" label="UPI number" placeholder="Enter UPI reference number" variant="standard"style={{marginTop:"10px",display:display_upi_id_section}} />
             <div className="m-btn">
             <Button onClick={handleSubmit} variant="outlined" style={{color:"#11acba",borderColor:"#11acba",marginTop:"20px"}}>RESET FORM</Button>
             <Button onClick={handleSubmit} variant="outlined" style={{color:"#FFF",backgroundColor:"#3abca7",borderColor:"#3abca7",marginTop:"20px"}}>CONFIRM</Button>
             </div>
</div>    