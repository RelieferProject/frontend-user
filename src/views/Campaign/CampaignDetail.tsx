import { useAppDispatch, useAppSelector } from '@states/hooks';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { increment, decrement } from '@states/counter/counterSlice';
import { useParams } from 'react-router-dom';
import { StatusCampaignArray, useCampaignByAddress } from '@hooks/useFactory';
import { Carousel } from 'antd';
import BaseIcon from '@components/Base/BaseIcon';
import { parseSecondsToEnglish, parseWeiToEther } from '@utils';
import useConfirm from '@hooks/useConfirm';
import usePopup from '@hooks/usePopup';
import { useCampaignContract } from '@hooks/useContract';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import { useIntervalTick } from '@hooks/useInterval';
import { IoMdRefreshCircle } from 'react-icons/io';
import BaseLoading from '@components/Base/BaseLoading';

interface Props extends SimpleComponent {}

const CampaignDetailWrapper = styled.div``;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function CampaignDetail(props: Props) {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const params = useParams();
  const address = params['id'];
  const { isConfirmed } = useConfirm();
  const popup = usePopup();
  const factoryContract = useCampaignContract(address);
  const { account } = useWeb3React();
  const profile = useAppSelector((state) => state.profile);

  const interval = useIntervalTick(1000);

  const [duration, setDuration] = React.useState(0);

  const data = useCampaignByAddress(address);

  const refresh = () => {
    dispatch(increment());
  };

  useEffect(() => {
    if (!data) return;
    if (!data.accountStatus.get_userStartTime) {
      setDuration(0);
    } else {
      if (!data.accountStatus.get_userEndTime) {
        const now = Date.now();
        const duration = now - +data.accountStatus.get_userStartTime;
        setDuration(duration / 1000);
      } else {
        const now = Date.now();
        const duration =
          +data.accountStatus.get_userEndTime - +data.accountStatus.get_userStartTime;
        setDuration(duration / 1000);
      }
    }
  }, [interval]);

  // console.log('address', address);

  const user_joinCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm to Join` });
    if (confirm) {
      popup.loading({ text: 'Join Campaign...' });
      try {
        const result = await factoryContract.user_joinCampaign();
        await result.wait();
        popup.success({ text: 'Join Campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.reason || 'Join Failed' });
      }
    }
  };

  const user_startCampaign = async () => {
    const confirm = await isConfirmed({ text: `Confirm count duration to earn` });
    if (confirm) {
      popup.loading({ text: 'count duration to earn...' });
      try {
        const result = await factoryContract.user_startCampaign();
        await result.wait();
        popup.success({ text: 'count duration to earn Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.reason || 'count duration to earn Failed' });
      }
    }
  };

  const user_endCampaign = async () => {
    const confirm = await isConfirmed({ text: `End joining campaign` });
    if (confirm) {
      popup.loading({ text: 'End joining campaign...' });
      try {
        const result = await factoryContract.user_endCampaign();
        await result.wait();
        popup.success({ text: 'End joining campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.reason || 'End joining campaign Failed' });
      }
    }
  };

  const user_claim = async () => {
    const confirm = await isConfirmed({ text: `Claim reward` });
    if (confirm) {
      popup.loading({ text: 'Claim reward...' });
      try {
        const result = await factoryContract.user_claim();
        await result.wait();
        popup.success({ text: 'Claim reward Success' });
        dispatch(increment());
      } catch (error: any) {
        console.log(error);
        popup.error({ text: error.reason || 'Claim reward Failed' });
      }
    }
  };

  const ActionBTN = () => {
    console.log('data.status', data.status);
    if (data.status === 'NOTSTARTED') {
      return (
        <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
          Waiting admin start joining
        </div>
      );
    }
    if (data.status === 'START_JOIN') {
      if (data.accountStatus.get_userStatus == 'NOT_JOIN') {
        return (
          <ButtonStyled onClick={user_joinCampaign} color="primary" className="text-center w-full">
            JOINING
          </ButtonStyled>
        );
      }
      if (data.accountStatus.get_userStatus == 'JOIN') {
        return (
          <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
            Waiting admin end joining
          </div>
        );
      }
    }
    if (data.status === 'END_JOIN') {
      if (data.accountStatus.get_userStatus == 'JOIN') {
        return (
          <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
            Wait Admin to start campaign (Activity)
          </div>
        );
      }
      if (data.accountStatus.get_userStatus == 'NOT_JOIN') {
        return (
          <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
            Campaign ended join cannot join
          </div>
        );
      }
    }

    if (data.status === 'STARTED_CAMPAIGN') {
      if (data.accountStatus.get_userStatus == 'JOIN') {
        return (
          <ButtonStyled onClick={user_startCampaign} color="primary" className="text-center w-full">
            Start Count duration to earn
          </ButtonStyled>
        );
      }
      if (data.accountStatus.get_userStatus == 'STARTED_CAMPAIGN') {
        return (
          <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
            Wait for campaign end
          </div>
        );
      }
    }

    if (data.status === 'END_CAMPAIGN') {
      if (data.accountStatus.get_userStatus == 'STARTED_CAMPAIGN') {
        return (
          <ButtonStyled onClick={user_endCampaign} color="primary" className="text-center w-full">
            End Campaign
          </ButtonStyled>
        );
      }
      if (data.accountStatus.get_userStatus == 'END_CAMPAIGN') {
        return (
          <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
            Wait for Admin Calculate Reward
          </div>
        );
      }
    }

    if (data.status === 'SUCCESS') {
      return (
        <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2">
          WAIT ADMIN TO MINT REWARD
        </div>
      );
    }

    if (data.status === 'CLAIM') {
      if (data.accountStatus.get_userStatus == 'CLAIM') {
        return (
          <ButtonStyled onClick={user_claim} color="primary" className="text-center w-full">
            Claim Reward
          </ButtonStyled>
        );
      }
    }

    if (data.accountStatus.get_userStatus === 'CLAIMED') {
      return (
        <div className="flex text-yellow-300 text-xl font-bold justify-center gap-2 animate-bounce">
          RECIEVED {(+parseWeiToEther(data.rewardTokenAmount.toString())).toFixed(0)} TOKEN SUCCESS
          !!!
        </div>
      );
    }

    return (
      <div className="flex text-red-300 text-xl font-bold justify-center gap-2">
        CANNOT ACTIVITY IN THIS CAMPAIGN
      </div>
    );
  };

  if (!data) return <BaseLoading />;

  return (
    <CampaignDetailWrapper>
      <div className="w-full glass p-6 flex space-x-6">
        <div className="w-full flex flex-col gap-4 relative">
          <div className="absolute right-0 top-0 cursor-pointer">
            <IoMdRefreshCircle className="text-5xl text-wh" onClick={refresh} />
          </div>
          <h1 className="text-white text-center text-2xl">{data.name}</h1>

          <Carousel>
            {data.picture.map((pic, i) => {
              return (
                <div key={`image-${pic}`}>
                  <img src={pic.url} alt={`image-${pic.url}`} />
                </div>
              );
            })}
          </Carousel>
          <div>
            <p className="text-lg mt-1 text-center">{data.description}</p>
          </div>
          <hr />

          <div className="">
            <b className="text-lg">Campaign start at </b>
            <p className="text-lg mt-1">
              {new Date(+data.startTime).toLocaleDateString()} :{' '}
              {new Date(+data.startTime).toLocaleTimeString()}
            </p>
          </div>

          <div className="">
            <b className="text-lg">Campaign end at </b>
            <p className="text-lg mt-1">
              {new Date(+data.endTime).toLocaleDateString()} :{' '}
              {new Date(+data.endTime).toLocaleTimeString()}
            </p>
          </div>

          <div className="">
            <b className="text-lg">Duration at join campaign </b>
            <p className="text-lg mt-1">{parseSecondsToEnglish(+data.durationToEarn)}</p>
          </div>

          <div className="">
            <b className="text-lg">Reward: </b>
            <div className="flex items-center gap-1">
              <p className="text-lg mt-1">{parseWeiToEther(data.rewardTokenAmount.toString())}</p>
              <BaseIcon className="" />
            </div>
          </div>

          {data.accountStatus.get_userEndTime !== 0 && (
            <div>
              <b className="text-lg">USER End Time </b>
              <p className="text-lg mt-1">
                {new Date(+data.accountStatus.get_userEndTime).toLocaleDateString()} :{' '}
                {new Date(+data.accountStatus.get_userEndTime).toLocaleTimeString()}
              </p>
            </div>
          )}

          {data.accountStatus.get_userStartTime !== 0 && (
            <div className="">
              <b className="text-lg">Duration : </b>
              <p className="text-lg mt-1">{parseSecondsToEnglish(duration)}</p>
            </div>
          )}

          {profile.isVerified ? (
            <div className='glass py-4'>
              <ActionBTN />
            </div>
          ) : (
            <div className="flex justify-center gap-2">
              <ButtonStyled color="yellow" className="text-center w-full">
                Verify to Join
              </ButtonStyled>
            </div>
          )}
        </div>
      </div>
    </CampaignDetailWrapper>
  );
}

export default CampaignDetail;
