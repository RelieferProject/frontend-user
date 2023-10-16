import ButtonStyled from '@components/ButtonStyled';
import InputStyled from '@components/InputStyled';
import useConfirm from '@hooks/useConfirm';
import { useValidatorContract } from '@hooks/useContract';
import usePopup from '@hooks/usePopup';
import { increment } from '@states/counter/counterSlice';
import { useAppDispatch } from '@states/hooks';
import { useToken } from '@states/profile/hooks';
import { useWeb3React } from '@web3-react/core';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends SimpleComponent {}

const VerifyWrapper = styled.div``;

function Verify(props: Props) {
  const { isConfirmed } = useConfirm();
  const popup = usePopup();
  const validation = useValidatorContract();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const token = useToken();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: 'xxx',
    email: 'xx@gmail.com',
    student_id: '62130500133',
    faculty: 'CS',
  });

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    return (
      state.name !== '' && state.email !== '' && state.student_id !== '' && state.faculty !== ''
    );
  };

  const submit = async () => {
    const confirm = await isConfirmed({ text: `Confirm to verify your wallet` });
    if (confirm) {
      popup.loading({ text: 'Loading', disable: true });
      try {
        await validation.register();
        popup.success({ text: 'Start Campaign Success' });
        dispatch(increment());
      } catch (error: any) {
        // console.log(Object.keys(error));
        // console.log(error.reason)
        popup.error({ text: error.reason || 'Verify Failed' });
        dispatch(increment());
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/verify`,
          {
            name: state.name,
            email: state.email,
            student_id: state.student_id,
            faculty: state.faculty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await popup.success({ text: 'Verify Success' });
        navigate('/profile');
      } catch (error: any) {
        // console.log(error);
        popup.error({ text: error.response.data.message || 'Verify Failed' });
      }
    }
  };

  return (
    <VerifyWrapper>
      <div className="glass p-6 rounded-lg my-6 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">✅ Verify ...</h1>
        </div>
        <InputStyled
          size={'large'}
          addonBefore={'Name'}
          name="name"
          value={state.name}
          onChange={onChange}
        />
        <InputStyled
          size={'large'}
          addonBefore={'Email'}
          name="email"
          type="email"
          value={state.email}
          onChange={onChange}
        />
        <InputStyled
          size={'large'}
          addonBefore={'STUDENT ID'}
          name="student_id"
          value={state.student_id}
          type="number"
          onChange={onChange}
        />
        <InputStyled
          size={'large'}
          addonBefore={'Faculty'}
          name="faculty"
          value={state.faculty}
          onChange={onChange}
        />

        <ButtonStyled
          color={''}
          disabled={!checkValid()}
          onClick={submit}
          className="w-full text-xl"
        >
          <div className="flex justify-center">SUBMIT</div>
        </ButtonStyled>
      </div>
    </VerifyWrapper>
  );
}

export default Verify;
