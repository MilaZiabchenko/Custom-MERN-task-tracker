import { useTasksContext } from '../context/TasksContext';
import { CATEGORIES } from '../constants/categories.js';
import FilterButtonsItem from './FilterButtonsItem';

const FilterButtons = () => {
  const { activeCategory, setActiveCategory } = useTasksContext();

  return (
    <div>
      <FilterButtonsItem
        id={CATEGORIES.LATEST}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Latest
      </FilterButtonsItem>
      <FilterButtonsItem
        id={CATEGORIES.PRIOR}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Prior
      </FilterButtonsItem>
      <FilterButtonsItem
        id={CATEGORIES.TODO}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        To Do
      </FilterButtonsItem>
      <FilterButtonsItem
        id={CATEGORIES.DONE}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Done
      </FilterButtonsItem>
    </div>
  );
};

export default FilterButtons;
