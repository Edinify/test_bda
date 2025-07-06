import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import  CheckIcon  from "../../../../../../assets/icons/Checkbox.svg?react";
import ProfileInput from "./ProfileInput";
import { useCustomHook } from "../../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../../components/DropdownIcon/DropdownIcon";

const ProfileList = ({ formik, updateModalState, modalData }) => {
  const { generalProfileList } = useCustomHook();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileErrMessage, setProfileErrMessage] = useState(false);

  const deleteClass = (index) => {
    if (modalData.profiles.length === 1) {
      updateModalState("profiles", []);
    } else {
      const profileData = [...modalData.profiles];
      profileData.splice(index, 1);
      updateModalState("profiles", profileData);
    }
  };
  const addProfile = () => {
    if (modalData.profiles) {
      // the same element can't be added twice
      if (
        modalData.profiles.find((item) => item.profile === selectedProfile.key)
      ) {
        setProfileErrMessage(true);
      } else {
        const profileData = [
          ...modalData?.profiles,
          { profile: selectedProfile.key, power: "" },
        ];
        setProfileErrMessage(false);
        updateModalState("profiles", profileData);
      }
    } else {
      const profileData = [{ profile: selectedProfile.key, power: "" }];
      setProfileErrMessage(false);
      updateModalState("profiles", profileData);
    }
    setSelectedProfile("");
    setOpenDropdown(false);
  };

  return (
    <div>
      <div className="dropdown-input courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": { fontSize: "12px", marginRight: "32px" },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Profillər"
              autoComplete="off"
              value={selectedProfile?.name || ""}
              disabled
              onClick={() => setOpenDropdown(!openDropdown)}
            />

            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
            {generalProfileList
              .filter((item) => item.key !== "workers")
              .map((item, index) => (
                <li key={index} onClick={() => setSelectedProfile(item)}>
                  {modalData?.profiles?.find(
                    (obj) => obj.profile === item.key
                  ) ? (
                    <CheckIcon />
                  ) : null}
                  <h4>{item.name}</h4>
                </li>
              ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedProfile}
            onClick={() => addProfile()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {formik.errors.profiles && formik.touched.profiles && (
        <small className="validation-err-message">
          {formik.errors.profiles}
        </small>
      )}

      <ul className="category-list courses-li">
        {profileErrMessage ? (
          <small className="category-error-message">
            Profil artıq mövcuddur.
          </small>
        ) : null}

        {modalData?.profiles?.map((item, index) => (
          <ProfileInput
            key={index}
            index={index}
            data={item}
            deleteClass={deleteClass}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
