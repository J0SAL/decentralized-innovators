import React, { useEffect, useContext } from 'react';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col,
} from 'reactstrap';
import BlockchainContext from '../../context/BlockChainContext';

// core components
import IndexNavbar from '../../components/Navbars/IndexNavbar.js';
import TransparentFooter from '../../components/Footers/TransparentFooter.js';

function LoginPage() {
	const [firstFocus, setFirstFocus] = React.useState(false);
	const [lastFocus, setLastFocus] = React.useState(false);
	const { web3, accounts, contract } = useContext(BlockchainContext);

	React.useEffect(() => {
		document.body.classList.add('login-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		return function cleanup() {
			document.body.classList.remove('login-page');
			document.body.classList.remove('sidebar-collapse');
		};
	}, []);

	useEffect(() => {
		console.log('web3', web3);
		console.log('accounts', accounts);
		console.log('contract', contract);
	}, [accounts, contract, web3]);

	return (
		<>
			<IndexNavbar />
			<div className='page-header clear-filter' filter-color='blue'>
				<div
					className='page-header-image'
					style={{
						backgroundImage:
							'url(' +
							require('assets/img/login.jpg').default +
							')',
					}}></div>
				<div className='content'>
					<Container>
						<Col className='ml-auto mr-auto' md='4'>
							<Card className='card-login card-plain'>
								<Form action='' className='form' method=''>
									<CardHeader className='text-center'>
										<div className='logo-container'>
											<img
												alt='...'
												src={
													require('assets/img/now-logo.png')
														.default
												}></img>
										</div>
									</CardHeader>
									<CardBody>
										<InputGroup
											className={
												'no-border input-lg' +
												(firstFocus
													? ' input-group-focus'
													: '')
											}>
											<InputGroupAddon addonType='prepend'>
												<InputGroupText>
													<i className='now-ui-icons users_circle-08'></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder='First Name...'
												type='text'
												onFocus={() =>
													setFirstFocus(true)
												}
												onBlur={() =>
													setFirstFocus(false)
												}></Input>
										</InputGroup>
										<InputGroup
											className={
												'no-border input-lg' +
												(lastFocus
													? ' input-group-focus'
													: '')
											}>
											<InputGroupAddon addonType='prepend'>
												<InputGroupText>
													<i className='now-ui-icons text_caps-small'></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder='Last Name...'
												type='text'
												onFocus={() =>
													setLastFocus(true)
												}
												onBlur={() =>
													setLastFocus(false)
												}></Input>
										</InputGroup>
									</CardBody>
									<CardFooter className='text-center'>
										<Button
											block
											className='btn-round'
											color='info'
											href='#pablo'
											onClick={(e) => e.preventDefault()}
											size='lg'>
											Get Started
										</Button>
									</CardFooter>
								</Form>
							</Card>
						</Col>
					</Container>
				</div>
				<TransparentFooter />
			</div>
		</>
	);
}

export default LoginPage;
