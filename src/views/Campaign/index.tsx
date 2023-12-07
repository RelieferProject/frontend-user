import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useFactoryContract } from '@hooks/useContract';
import { useFactoryGetList } from '@hooks/useFactory';
import React from 'react';
import styled from 'styled-components';
import CampaignCard from './components/CampainCard';
import BaseLoading from '@components/Base/BaseLoading';
import moment from 'moment';

const CampaignPageWrapper = styled.div``;

const CampaignPage = () => {
  const campaignList = useFactoryGetList();

  const filterCampaign = (campaignList: any) => {
    return campaignList.filter((item: any) => {
      return item.accountStatus.get_userStatus === 'NOT_JOIN' && moment().isBefore(item.endTime);
    });
  };

  if (campaignList.length === 0) return <BaseLoading />;

  return (
    <CampaignPageWrapper>
      <h1 className="text-2xl mt-4 font-bold text-white">กิจกรรมที่สามารถเข้าร่วมได้</h1>
      <div className="w-full flex flex-wrap justify-start gap-4 mt-6">
        {filterCampaign(campaignList).map((item, index) => {
          return <CampaignCard data={item} key={item.address} />;
        })}
      </div>
    </CampaignPageWrapper>
  );
};

export default CampaignPage;
