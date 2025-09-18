let offerData = {}; // in-memory storage

const createOffer = (req, res) => {
  const { name, value_props, ideal_use_cases } = req.body;

  if (!name || !value_props || !ideal_use_cases) {
    return res.status(400).json({ error: "All fields are required" });
  }

  offerData = { name, value_props, ideal_use_cases };
  return res.json({ message: "Offer saved successfully", offer: offerData });
};

const getOffer = () => offerData;

export { createOffer, getOffer };
