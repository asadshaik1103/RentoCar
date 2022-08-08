import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export default function Review() {

var fname=localStorage.getItem("fname");
var lname=localStorage.getItem("lname");
var address1=localStorage.getItem("address");
var city=localStorage.getItem("city");
var state=localStorage.getItem("state");
var zip=localStorage.getItem("zip");
var country=localStorage.getItem("country");
var cname=localStorage.getItem("cardName");
var cnumber=localStorage.getItem("cardNumber");
var exp=localStorage.getItem('expDate');

var car_name=localStorage.getItem('car_name');
var pickup_Date=localStorage.getItem('pickupDate');
var pickup_Time=localStorage.getItem('pickupTime');
var car_image=localStorage.getItem('car_image');
var price=localStorage.getItem('price');
var insurance = localStorage.getItem('insurance_cost');
var total_price=localStorage.getItem('total_price');
var offer_price=localStorage.getItem('offer_percentage');

const products = [
  { 
    name: car_name,
    price: price,
    pickup_Date: pickup_Date,
    pickup_Time: pickup_Time
  },
];

const addresses = [address1, city, state, zip, country];
const payments = [
  { name: 'Card holder', detail: cname },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-'+cnumber.slice(- 4) },
  { name: 'Expiry date', detail: exp },
];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <img src={car_image} alt="car" width={200}/>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.pickup_Date+' at '+product.pickup_Time}/>
            <Typography variant="body2">$ {product.price}</Typography>
          </ListItem>
        ))}
         <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Insurance" />
          <Typography variant="body2">
            ${insurance}
          </Typography>
        </ListItem>
       
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Discount" />
          <Typography variant="body2">
            {offer_price}%
          </Typography>
        </ListItem>


        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total_price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Billing
          </Typography>
          <Typography gutterBottom>{fname} {lname}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}