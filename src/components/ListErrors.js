import React from 'react';


function ListErrors({ errors }) {
  if (errors) {
    return (
      <ul className="error-messages">
        {
          Object.keys(errors).map(key => {
            return (
              <li key={key}>
                {key} {errors[key]}
              </li>
            );
          })
        }
      </ul>
    );
  }

  return null;
}


export default ListErrors;
