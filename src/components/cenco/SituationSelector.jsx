import React, { useState, useEffect } from "react";
import { getCategoriesWithSituations } from "../../api/situations.js";
import axios from "axios";
import BaseModal from "../modals/BaseModal.jsx";

function SituationSelector({ isOpen, onRequestClose, onSelectSituation }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await getCategoriesWithSituations();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories with situations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} title="Seleccione una Situación">
            {loading ? (
                <p>Cargando categorías...</p>
            ) : (
                <div className="situation-container">
                    <select className="cenco-situation-select" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory || ""}>
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {selectedCategory &&
                        categories
                            .find((category) => category.id === parseInt(selectedCategory))
                            ?.situations.map((situation) => (
                                <div className="situations-container" key={situation.id}>
                                    <button className="situation-btn" onClick={() => onSelectSituation(situation.name)}>
                                        {situation.name}
                                    </button>
                                </div>
                            ))}

                    {selectedCategory && !categories.find((category) => category.id === parseInt(selectedCategory))?.situations.length && (
                        <p>No hay situaciones disponibles para esta categoría.</p>
                    )}
                </div>
            )}
        </BaseModal>
    );
}

export default SituationSelector;
