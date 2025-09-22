import { useEffect } from 'react';
import { getCategoryById } from 'src/fetch-global';

const fetchCategoryNames = async (categoryIds, setNameCategory) => {
  try {
    const categoryNames = await Promise.all(
      categoryIds.map(async (id) => {
        const data = await getCategoryById(id);
        return data ? data.name : null;
      })
    );
    setNameCategory(categoryNames.filter(Boolean));
  } catch (error) {
    console.error('Error fetching category names:', error);
  }
};

export const useFetchCategoryNames = (image, setNameCategory) => {
  useEffect(() => {
    const category = image.find((img) => img.attribute_code === 'category_ids');
    if (category && category.value) {
      fetchCategoryNames(category.value, setNameCategory);
    }
  }, [image, setNameCategory]);
};
