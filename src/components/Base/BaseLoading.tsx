import styled from 'styled-components';
import logo from '@assets/logo.svg';
import loadingJson from '@assets/lottie/loading.json';
import ReactLottie from './ReactLottie';

interface Props extends SimpleComponent {}

const BaseIconWrapper = styled.div``;

function BaseLoading(props: Props) {
  return (
    <BaseIconWrapper className={`${props.className}`}>
      <ReactLottie json={loadingJson} height={300} width={300} />
    </BaseIconWrapper>
  );
}

export default BaseLoading;
