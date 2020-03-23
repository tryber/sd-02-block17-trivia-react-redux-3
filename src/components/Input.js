import React from 'react';
import sendName from '../actions/SendName';
import sendEmail from '../actions/SendEmail';

const InputInitial = ({ NameToReducer, EmailToReducer }) => (
  <div>
    <label htmlFor="input-email" data-testid="label-gravatar-email" >Email do gravatar:</label>
    <input
      type="email"
      id="input-email"
      data-testid="input-gravatar-email"
      onChange={({ target }) => console.log(target.value)}
    />
    <label htmlFor="input-name" data-testid="label-player-name" >Nome do Jogador:</label>
    <input
      type="text"
      id="input-Name"
      data-testid="input-player-name"
    />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  NameToReducer: (name) => dispatch(sendName(name)),
  EmailToReducer: (email) => dispatch(sendEmail(email)),
});

export default connect(null, mapDispatchToProps)(InputInitial);
