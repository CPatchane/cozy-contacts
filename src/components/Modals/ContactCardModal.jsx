import React from "react";
import { PropTypes } from "prop-types";
import { withDeletion } from "../../connections/allContacts";
import Modal, { ModalHeader, ModalContent } from "cozy-ui/react/Modal";
import { Icon, Menu, MenuItem, Button } from "cozy-ui/react";
import ContactCard from "../ContactCard/ContactCard";
import contactPropTypes from "../ContactPropTypes";

const ContactCardMenu = ({ deleteAction }) => (
  <Menu
    position="right"
    className="contact-card-modal__menu"
    component={
      <Button
        theme="secondary"
        extension="narrow"
        icon="dots"
        className="fix-c-btn"
      />
    }
  >
    <MenuItem
      className="menu__item--danger"
      icon={<Icon icon="delete" />}
      onSelect={deleteAction.action}
    >
      {deleteAction.label}
    </MenuItem>
  </Menu>
);
ContactCardMenu.propTypes = {
  deleteAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
};

const ContactCardModal = (
  { onClose, contact, deleteContact, onDeleteContact },
  { t }
) => (
  <Modal into="body" dismissAction={onClose} size="xlarge">
    <ContactCard
      title={t("contact_info")}
      contact={contact}
      renderHeader={children => (
        <ModalHeader className="contact-card-modal__header">
          {children}
          <ContactCardMenu
            deleteAction={{
              label: t("delete"),
              action: () => deleteContact(contact).then(() => onDeleteContact())
            }}
          />
        </ModalHeader>
      )}
      renderBody={children => <ModalContent>{children}</ModalContent>}
    />
  </Modal>
);
ContactCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    email: PropTypes.arrayOf(contactPropTypes.email),
    address: PropTypes.arrayOf(contactPropTypes.address),
    cozy: PropTypes.arrayOf(contactPropTypes.cozy),
    birthday: contactPropTypes.birthday,
    note: contactPropTypes.note
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default withDeletion(ContactCardModal);