import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { useCampaignContract, useFactoryContract } from '@hooks/useContract';
import { CampaignInterface, useFactoryGetList } from '@hooks/useFactory';
import { addressParse, parseSecondsToEnglish, parseWeiToEther } from '@utils';
import React from 'react';
import styled from 'styled-components';
import Image from 'react';
import ButtonStyled from '@components/ButtonStyled';
import useConfirm from '@hooks/useConfirm';
import usePopup from '@hooks/usePopup';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@states/hooks';
import { increment } from '@states/counter/counterSlice';
import { useCounter } from '@states/counter/hooks';
import BaseIcon from '@components/Base/BaseIcon';
import { Link } from 'react-router-dom';

const CampaignCardWrapper = styled.div``;

const CampaignCard = ({ data, own } : { data : CampaignInterface; own? : boolean }) => {
  const { isConfirmed } = useConfirm();
  const popup = usePopup();
  const factoryContract = useCampaignContract(data.address);
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();

  const campainger_start = async () => {
    const confirm = await isConfirmed({ text : `Confirm to Start` });
    if (confirm) {
      popup.loading({ text : 'Start Campaign...' });
      try {
        await factoryContract.startJoinCampaign();
        popup.success({ text : 'Start Campaign Success' });
        dispatch(increment());
      } catch (error : any) {
        console.log(error);
        popup.error({ text : error.data?.message || 'Start Campaign Failed' });
        dispatch(increment());
      }
    }
  };

  return (
    <CampaignCardWrapper className="flex flex-col gap-4 p-4 pt-6 rounded-md border-2 relative glass w-[30rem]">
      <div>
        <b className="text-xl mr-2">Name : {}</b>
        <span className="text-xl">{data.name}</span>
      </div>
      {!own && (
        <div>
          <b className="text-xl mr-2">Start Time : </b>
          <span className="text-xl">
            {new Date(+data.startTime).toLocaleDateString()}  :{' '}
            {new Date(+data.startTime).toLocaleTimeString()}
          </span>
        </div>
      )}

      {!own && (
        <div>
          <b className="text-xl mr-2">End Time : </b>
          <span className="text-xl">
            {new Date(+data.endTime).toLocaleDateString()}  :{' '}
            {new Date(+data.endTime).toLocaleTimeString()}
          </span>
        </div>
      )}

      {!own && (
        <div>
          <b className="text-xl mr-2">Duration : </b>
          <span className="text-xl">{parseSecondsToEnglish(data.durationToEarn)}</span>
        </div>
      )}

      <div className="flex items-center">
        <b className="text-xl mr-2">Reward : </b>
        <div className="flex items-center gap-1">
          <span className="text-xl">{parseWeiToEther(data.rewardTokenAmount.toString())}</span>
          <BaseIcon className="" />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Link className="w-full" to={`/dashboard/campaign/${data.address}`}>
          <ButtonStyled color="yellow" className="text-center w-full">
            Details
          </ButtonStyled>
        </Link>
      </div>
    </CampaignCardWrapper>
  );
};

export default CampaignCard;
