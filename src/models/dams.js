import mongoose from "mongoose";


const damSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year_completed: { type: Number, required: true },
    river: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    height_m: { type: Number, required: true },
    length_m: { type: Number, required: true },
    volume_content_1000m3: { type: Number, required: true },
    gross_storage_capacity_1000m3: { type: Number, required: true },
    reservoir_area_1000m2: { type: Number, required: true },
    effective_storage_capacity_1000m3: { type: Number, required: true },
    purpose: { type: String, required: true },
    designed_spillway_capacity_m3s: { type: Number, required: true }
}, { timestamps: true });

const Dam = mongoose.model("Dam", damSchema);

export default Dam;
