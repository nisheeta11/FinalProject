import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../Data/CourseData';

const allCourses = Object.values(coursesData).flat();

const generate3Grams = (input) => {
  const grams = [];
  const query = input.toLowerCase();
  if (query.length < 3) {
    grams.push(query);
  } else {
    for (let i = 0; i <= query.length - 3; i++) {
      grams.push(query.slice(i, i + 3));
    }
  }
  return grams;
};

const useSearchContext = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim().length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const grams = generate3Grams(input);
    const matches = allCourses.filter(course => {
      const title = course.title.toLowerCase();
      const description = course.description.toLowerCase();
      return grams.some(gram => title.includes(gram) || description.includes(gram));
    });

    setResults(matches);
    setShowDropdown(true);
  };

  const handleSearchClick = () => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 3) {
      alert('Please enter at least 3 characters to search.');
      return;
    }

    const foundCourses = allCourses.filter(course =>
      course.title.toLowerCase().includes(trimmed) ||
      course.description.toLowerCase().includes(trimmed)
    );

    if (foundCourses.length > 0) {
      navigate(`/course/${foundCourses[0].id}`);
      setQuery('');
      setResults([]);
      setShowDropdown(false);
    } else {
      alert('No matching course found.');
    }
  };

  const handleSelect = (id) => {
    navigate(`/course/${id}`);
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    query,
    results,
    showDropdown,
    containerRef,
    handleInputChange,
    handleSearchClick,
    handleSelect,
    setShowDropdown,
  };
};

export default useSearchContext;
