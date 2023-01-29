import { useTasksContext } from '../context/TasksContext';
import { CATEGORIES } from '../utils/constants';
import FilterButton from './FilterButton';

const FilterButtons = () => {
  const { activeCategory, setActiveCategory } = useTasksContext();

  return (
    <div>
      <FilterButton
        id={CATEGORIES.LATEST}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Latest
      </FilterButton>
      <FilterButton
        id={CATEGORIES.PRIOR}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Prior
      </FilterButton>
      <FilterButton
        id={CATEGORIES.TODO}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        To Do
      </FilterButton>
      <FilterButton
        id={CATEGORIES.DONE}
        activeCategory={activeCategory}
        handleCategory={e => setActiveCategory(e.target.id)}
      >
        Done
      </FilterButton>
    </div>
  );
};

export default FilterButtons;
