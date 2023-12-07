import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { addressParse } from '@utils';
import { useAppSelector } from '@states/hooks';
import { Link } from 'react-router-dom';
import ButtonStyled from '@components/ButtonStyled';

interface Props extends SimpleComponent {}

const ProfileBoxWrapper = styled.div`
  .icon {
    font-size: 2rem;
  }
  .icon * {
    color: #fff;
  }
`;

function ProfileBox(props: Props) {
  const profile = useAppSelector((state) => state.profile);
  // console.log('profile', profile);
  const { account } = profile;
  return (
    <ProfileBoxWrapper>
      <div className="glass p-6 rounded-lg my-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">โปรไฟล์</h1>
          <FaUserCircle className="icon" />
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">เลขกระเป๋า</h1>
          </div>
          <div className="text-text-purple text-xl font-bold">{addressParse(account)}</div>
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">ชื่อ</h1>
          </div>
          <div className="text-text-purple text-xl font-bold">{profile.name || "-"}</div>
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">อีเมล</h1>
          </div>
          <div className="text-text-purple text-xl font-bold">{profile.email || "-"}</div>
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">รหัสนักศึกษา</h1>
          </div>
          <div className="text-text-purple text-xl font-bold">{profile.student_id || "-"}</div>
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">คณะ</h1>
          </div>
          <div className="text-text-purple text-xl font-bold">{profile.faculty}</div>
        </div>

        <div className="my-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-text-purple text-xl font-bold">สถานะการยืนยันตัวตน</h1>
          </div>
          <div
            className={`${
              !profile.isVerified ? 'text-yellow-400' : 'text-emerald-400'
            } text-xl font-bold flex gap-2 items-center`}
          >
            {!profile.isVerified ? '🔜 รอยืนยัน' : '✅ สำเร็จ'}
          </div>
        </div>

        {!profile.isSendVerify && (
          <Link className="w-full" to={'/verify'}>
            <ButtonStyled color={''} className="w-full text-xl">
              <div className="flex justify-center">ยืนยันตัวตน</div>
            </ButtonStyled>
          </Link>
        )}
      </div>
    </ProfileBoxWrapper>
  );
}

export default ProfileBox;
