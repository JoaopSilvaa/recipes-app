import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './CardDone.css';

export default function CardDonesFoods(props) {
  const { recipe, index } = props;
  const [messageLinkCopied, setMessageLinkCopied] = useState(false);
  const EXPOSURE_TIME = 5000;
  function linkCopied() {
    copy(`http://localhost:3000/foods/${recipe.id}`);
    setMessageLinkCopied(true);
    setTimeout(() => {
      setMessageLinkCopied(false);
    }, EXPOSURE_TIME);
  }
  return (
    <div className="main-card-done">
      <main className="cardsDone">
        <Link to={ `/foods/${recipe.id}` }>
          <img
            style={ { width: '120px' } }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
        <div className="container-details">
          <Link to={ `/foods/${recipe.id}` }>
            <h1
              className="title-card"
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h1>
          </Link>
          <div>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            {recipe.tags
              ? recipe.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }

                >
                  {tag}
                </p>
              ))
              : <p>Nao tem nada aqui</p>}
          </div>
          <button
            type="button"
            onClick={ linkCopied }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share-icon"
            />
          </button>
        </div>
      </main>
      {messageLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

CardDonesFoods.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
