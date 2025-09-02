import mongoose from "mongoose";

const WaterLogSchema = new mongoose.Schema({
    rainfall_mm: Number,
    water_level_percentage: Number,
    date: { type: Date, default: Date.now }, // auto timestamp
});

const DamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year_completed: { type: String },
    river: { type: String },
    location: { type: String },
    type: { type: String },
    height_m: { type: String },
    length_m: { type: String },
    volume_content_1000m3: { type: String },
    gross_storage_capacity_1000m3: { type: String },
    reservoir_area_1000m2: { type: String },
    effective_storage_capacity_1000m3: { type: String },
    purpose: { type: String },
    designed_spillway_capacity_m3s: { type: String },

    // ✅ NEW FIELDS
    runoff_coefficient: { type: Number, min: 0, max: 1 }, // between 0–1
    catchment_area_km2: { type: Number },

    // ✅ Water level tracking
    water_level_percentage: { type: Number, default: 50, min: 0, max: 100 },
    last_rainfall_mm: { type: Number, default: 0 }, // last rainfall input

    waterLogs: [WaterLogSchema],
});

export default mongoose.models.Dam || mongoose.model("Dam", DamSchema);
