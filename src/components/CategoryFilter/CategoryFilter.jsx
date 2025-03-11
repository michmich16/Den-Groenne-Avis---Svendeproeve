import s from './CategoryFilter.module.scss'
import { useGet } from '../../hooks/useGet'
import { useNavigate } from 'react-router-dom';

export const CategoryFilter = () => {
    const { data: categoryFilterData, isLoading: categoryFilterIsLoading, error: categoryFilterError } = useGet('http://localhost:4242/categories');
    const navigate = useNavigate();

    return (
        <>
            <section>
                <h5>Alle Kategorier</h5>
                {!categoryFilterIsLoading && categoryFilterData?.data?.map((category) => (
                    <li 
                        key={category.id} // Ensure unique keys for the list items
                        onClick={() => navigate(`/products/category/${category.slug}`)} // Use the correct property
                    >
                        {category.name}
                    </li>
                ))}
            </section>
        </>
    );
};
