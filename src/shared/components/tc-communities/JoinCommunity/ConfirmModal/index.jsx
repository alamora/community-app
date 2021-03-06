/**
 * The modal asking visitor to confirm that he wants to join community where
 * JoinCommunity component is rendered. If visitor is authenticated it shows
 * Join / Cancel buttons that do what they are supposed to do; otherwise it
 * shows Register & Join / Log In & Join / Cancel buttons, first of which get
 * visitor to registration / login flows, with return url making the join to
 * happen automatically.
 */

/* global window */

import config from 'utils/config';
import Modal from 'components/Modal';
import PT from 'prop-types';
import React from 'react';
import './style.scss';

export default function ConfirmModal({
  communityName,
  groupIds,
  join,
  resetJoinButton,
  token,
  userId,
}) {
  return (
    <Modal onCancel={resetJoinButton}>
      <div styleName="confirmMsg">
        { userId ? (
          <p>Do you want to join {communityName}?</p>
        ) : (
          <div>
            <p>You must be a Topcoder member before you can join the {communityName}.</p>
            <p>To join, login if you are already a member. If not, register first.</p>
          </div>
        )}
      </div>
      <div styleName="buttons">
        { userId ? (
          <span>
            <button
              onClick={() => join(token, groupIds[0], userId)}
              styleName="btnConfirm"
            >Join</button>
            <button
              onClick={resetJoinButton}
              styleName="btnCancel"
            >Cancel</button>
          </span>
        ) : (
          <span>
            <button
              onClick={() => {
                const url = encodeURIComponent(
                  `${window.location.href}?join=${groupIds[0]}`,
                );
                window.location = `${config.URL.AUTH}/member?retUrl=${url}`;
              }}
              styleName="btnConfirmLong"
            >Login</button>
            <button
              onClick={() => {
                let url = encodeURIComponent(
                  `${window.location.href}?join=${groupIds[0]}`,
                );
                url = encodeURIComponent(
                  `${config.URL.AUTH}/member?retUrl=${url}`,
                );
                url = encodeURIComponent(url);
                window.location = `${config.URL.AUTH}/member/registration?retUrl=${url}`;
              }}
              styleName="btnConfirmLong"
            >Register</button>
            <button
              onClick={resetJoinButton}
              styleName="btnCancelLong"
            >Cancel</button>
          </span>
        )}
      </div>
    </Modal>
  );
}

ConfirmModal.defaultProps = {
  token: null,
  userId: null,
};

ConfirmModal.propTypes = {
  communityName: PT.string.isRequired,
  groupIds: PT.arrayOf(PT.string).isRequired,
  join: PT.func.isRequired,
  resetJoinButton: PT.func.isRequired,
  token: PT.string,
  userId: PT.string,
};
