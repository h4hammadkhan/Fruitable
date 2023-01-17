package com.fruitable.Service;


import com.fruitable.UserOrderModel.Ship;
import com.fruitable.fileResponse.ShipPageableResponse;

public interface ShipService {

	// add to ship
	public Ship addToShip(Ship ship);
	
	// update
	public Ship updateShip(Ship ship);
	
	// get all ShipInfo
	public  ShipPageableResponse getAllShip(Integer pageNumber, Integer pageSize,String sortBy);
	
	// get all by code
	public ShipPageableResponse getAllShipByCodeAndActive(
			String code,Boolean active,Integer pageNumber, Integer pageSize,String sortBy);
	
	// get by ShipID
	public Ship getByShipId(long shipId);
	
	// get sellerUserName
	public ShipPageableResponse getAllByActiveAndSeller(
			Boolean active,String sellerUserName,Integer pageNumber, Integer pageSize,String sortBy);
	
	// delete 
	public void deleteFromShip(long shipId);

}
