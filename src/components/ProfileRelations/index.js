import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';

const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`; 

export const ProfileRelations = ({ title, items }) => {
    const MAX_TO_HOW = 6;

    return (
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            {`${title} (${items.length})`}
        </h2>
        <ul>
            {items.map(({id, title, image, url}, index) => {
                if(index < MAX_TO_HOW) {
                    return (
                        <li key={id}>
                            <a href={url ? url : ''}>
                            <img
                                style={{ borderRadius: '8px' }}
                                src={image ? image : 'https://github.com/30x30.png'}
                            />
                            <span>{title}</span>
                            </a>
                        </li>
                    );
                }
            })
            }
        </ul>
        </ProfileRelationsBoxWrapper>
    );
};

ProfileRelations.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};
