import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useFactoryContract } from '@hooks/useContract';
import { useFactoryGetList } from '@hooks/useFactory';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import CampaignCard from './components/CampainCard';
import BaseLoading from '@components/Base/BaseLoading';

const OwnCampaignPageWrapper = styled.div``;

const OwnCampaignPage = () => {
  const campaignList = useFactoryGetList();

  const filterCampaign = (campaignList: any) => {
    return campaignList.filter((item: any) => {
      return item.accountStatus.get_userStatus !== 'NOT_JOIN';
    });
  };

  if (campaignList.length === 0) return <BaseLoading />;

  return (
    <OwnCampaignPageWrapper>
      <h1 className="text-4xl font-bold text-white">My Campaings</h1>
      <div className="w-full flex flex-wrap justify-start gap-4 mt-6">
        {filterCampaign(campaignList).map((item, index) => {
          return <CampaignCard data={item} key={item.address} own={true} />;
        })}
      </div>
    </OwnCampaignPageWrapper>
  );
};

export default OwnCampaignPage;
