// Author: Aditya Mahale(ad619659@dal.ca)

import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { getOffers, addOffer, deleteOffer } from "../../services/offers";
import {
  Grid,
  Container,
  Stack,
  Typography,
  styled,
  Button,
} from "@mui/material";
import Joi from "joi";
import { toast } from "react-toastify";
import Modal from "./modal";
import OfferForm from "./offerForm";
import NavBar from "../../components/common/nav-bar";
import OfferContext from "../../context/offerContext";

const StyledButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#00d2d3",
  padding: "15px",
  "&:active": {
    backgroundColor: "#00d2d3",
  },
  "&:hover": {
    backgroundColor: "#00d2d3",
  },
  "&:disabled": {
    border: "1px solid #999999",
    backgroundColor: "#cccccc",
    color: "#666666",
  },
});

const Offers = ({ user }) => {
  const [offers, setOffers] = useState([]);
  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(OfferContext);

  const [offerFields, setOfferFields] = useState({
    title: "",
    description: "",
    discount: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    discount: Joi.number().required().label("Discount"),
  });

  const validate = () => {
    const result = schema.validate(offerFields, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const allErrors = {};
    for (let item of result.error.details) {
      allErrors[item.path[0]] = item.message;
    }

    return allErrors;
  };

  const handleChange = ({ target: input }) => {
    const newOfferFields = { ...offerFields };
    newOfferFields[input.name] = input.value;
    setOfferFields(newOfferFields);
  };

  const handleOfferPost = async (e) => {
    const originalOffers = offers;
    try {
      e.preventDefault();
      const allErrors = validate();
      setErrors(allErrors || {});
      if (allErrors) {
        return;
      }
      const { data: newOffer } = await addOffer(offerFields);
      const newOffers = [{ ...newOffer }, ...offers];
      setOffers(newOffers);
      handleClose();
      toast.success("Offer Added Successfully");
      setOfferFields({
        title: "",
        description: "",
        discount: "",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
        setOffers(originalOffers);
      }
    }
  };

  const handleSelect = (selected) => {
    if (user && !user.isAdmin) return;
    setSelectedOffer({ ...selected });
  };

  const handleDelete = async () => {
    const originalOffers = offers;
    try {
      const newOffers = offers.filter(
        (offer) => offer._id !== selectedOffer._id
      );
      setOffers(newOffers);
      await deleteOffer(selectedOffer._id);
      setSelectedOffer(null);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
        setOffers(originalOffers);
      }
    }
  };

  const handleApply = (discount) => {
    toast.success("Offer Applied");
    context.setOffer(parseInt(discount));
    setApplied(true);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: offers } = await getOffers();
      setOffers(offers);
    };

    getData();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Container
        sx={{
          marginTop: "30px",
          paddingTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          paddingBottom: "20px",
          border: "1px solid #00d2d3",
        }}
      >
        <Modal onClose={handleClose} open={open}>
          <OfferForm
            offerFields={offerFields}
            onChange={handleChange}
            onOfferPost={handleOfferPost}
            errors={errors}
            selectedOffer={selectedOffer}
          />
        </Modal>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          marginBottom="20px"
          justifyContent="space-between"
          padding="0px 15px 0px 15px"
        >
          <Typography variant="h4" component="h4" textAlign="left">
            Offers
          </Typography>

          {user && user.isAdmin && (
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              <StyledButton
                onClick={handleDelete}
                disabled={selectedOffer === null}
                variant="outlined"
              >
                DELETE OFFER
              </StyledButton>
              <StyledButton onClick={handleOpen} variant="outlined">
                ADD OFFER
              </StyledButton>
            </Stack>
          )}
        </Stack>
        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid
              item
              xs={12}
              md={4}
              style={{ cursor: "pointer" }}
              key={offer._id}
            >
              <Card
                key={offer.id}
                offer={offer}
                selectedOffer={selectedOffer}
                onSelect={handleSelect}
                onApply={handleApply}
                applied={applied}
                user={user}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Offers;
