const OfferSpecial = require("../models/OfferSpecial");

module.exports.registre_offer = async(req, res) => {
    const { designation, service, startDate, endDate, discount } = req.body;

    try {
        const offerSpecial = await OfferSpecial.create({ designation, service, startDate, endDate, discount });
        const response = {
            message: "offer added successfully",
            data: offerSpecial
        }
        res.status(201).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}


module.exports.offer_list = async(req, res) => {

    try {
        const offers = await OfferSpecial.find().populate('service');
        const response = {
            message: "List of available offer",
            data: offers
        }
        res.status(201).json({ response: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.delete_offer = async(req, res) => {
    const { id } = req.params;

    try {
        const offer = await OfferSpecial.findOneAndDelete({ _id: id });

        if (!offer) {
            return res.status(404).json({ error: "Offer not found" });
        }

        res.status(200).json({ message: "Offer deleted successfully", response: offer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}