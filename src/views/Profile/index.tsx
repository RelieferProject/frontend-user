import React from 'react';
import styled from 'styled-components';
import Wallet from './Wallet';
import ProfileBox from './ProfileBox';

interface Props extends SimpleComponent {}

const ProfileWrapper = styled.div``;

function Profile(props: Props) {
  return (
    <ProfileWrapper>
      <div className="flex flex-col">
        <Wallet />
        <ProfileBox />
      </div>
    </ProfileWrapper>
  );
}

export default Profile;
