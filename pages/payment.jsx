/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CartItems } from '../components';

const Payment = () => {
	return (
		<div className="payment-container">
			<CartItems styling="payment-cart-container" />
			<div>
				<form
					action="/send-data-here"
					method="post"
					className="form-container"
				>
					<input
						type="text"
						id="first"
						name="first"
						placeholder="Prenume"
						enterkeyhint="next"
					/>
					<input
						type="text"
						id="last"
						name="last"
						placeholder="Nume"
					/>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="E-mail"
					/>
					<input
						type="tel"
						id="phone"
						name="phone"
						placeholder="Numar de telefon"
					/>
					<input
						type="text"
						id="adress"
						name="adress"
						placeholder="Strada si numar"
					/>
					<input
						type="text"
						id="adress"
						name="adress"
						placeholder="Bloc, etaj, apartament"
					/>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Oras"
					/>
					<select id="counties" name="countylist" className="minimal">
						<option value="alba"> Alba </option>
						<option value="arad"> Arad </option>
						<option value="arges"> Arges </option>
						<option value="bacau"> Bacau </option>
						<option value="bihor"> Bihor </option>
						<option value="bistrita"> Bistrita-Nasaud </option>
						<option value="botosani"> Botosani </option>
						<option value="braila"> Braila </option>
						<option value="brasov"> Brasov </option>
						<option value="bucuresti"> Bucuresti </option>
						<option value="buzau"> Buzau </option>
						<option value="calarasi"> Calarasi </option>
						<option value="severin"> Caras-Severin </option>
						<option value="cluj"> Cluj </option>
						<option value="constanta"> Constanta </option>
						<option value="covasna"> Covasna </option>
						<option value="dambovita"> Dambovita </option>
						<option value="dolj"> Dolj </option>
						<option value="galati"> Galati </option>
						<option value="giurgiu"> Giurgiu </option>
						<option value="gorj"> Gorj </option>
						<option value="harghita"> Harghita </option>
						<option value="hunedoara"> Hunedoara </option>
						<option value="ialomita"> Ialomita </option>
						<option value="iasi"> Iasi </option>
						<option value="ilfov"> Ilfov </option>
						<option value="maramures"> Maramures </option>
						<option value="mehedinti"> Mehedinti </option>
						<option value="mures"> Mures </option>
						<option value="neamt"> Neamt </option>
						<option value="olt"> Olt </option>
						<option value="prahova"> Prahova </option>
						<option value="salaj"> Salaj </option>
						<option value="satumare"> Satu Mare </option>
						<option value="sibiu"> Sibiu </option>
						<option value="suceava"> Suceava </option>
						<option value="teleorman"> Teleorman </option>
						<option value="timis"> Timis </option>
						<option value="tulcea"> Tulcea </option>
						<option value="valcea"> Valcea </option>
						<option value="vaslui"> Vaslui </option>
						<option value="vrancea"> Vrancea </option>
					</select>
					<button type="submit" className="submit-form">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Payment;
