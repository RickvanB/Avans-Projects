package model;

import java.sql.ResultSet;

public class InstertMaterialsModel {

	// Variables
	private static final int ONE_MATERIAL = 0;
	private static final int AMOUNT_OF_MATERIALS = 1;
	private static final int AMOUNT_TO_INSERT = 20;
	private static final String ZERO = "0";

	// Objects
	private DatabaseCommunicator dC;

	// Constructor
	public InstertMaterialsModel() {
		this.dC = DatabaseCommunicator.getInstance();
	}

	/**
	 * This method will insert materials into the database if they are not already
	 * loaded
	 */
	public void insertMaterials(int gameID) {
		boolean empty = true;

		ResultSet result;

		// Parameters
		String[] params = { Integer.toString(gameID) };

		try {
			// Check if materials are already loaded
			result = dC.select("SELECT COUNT(idgrondstofkaart) FROM spelergrondstofkaart WHERE idspel = ?", params);

			while (result.next()) {
				if (Integer.parseInt(result.getString(AMOUNT_OF_MATERIALS)) > ONE_MATERIAL) {
					empty = false;
				}
			}

			if (empty) {
				final String[] materials = { "h", "b", "g", "w", "e" };
				// For every kind of materials
				for (int i = 0; i < materials.length; i++) {
					// For every kind of materials 19 times
					for (int materialNumber = 1; materialNumber < AMOUNT_TO_INSERT; materialNumber++) {

						String materialCode = "";
						// Check if there needs to be insert a zero
						if (materialNumber < 10) {
							materialCode = materials[i] + ZERO + materialNumber;
						} else {
							materialCode = materials[i] + materialNumber;
						}

						// Parameters
						String[] params_Insert = { Integer.toString(gameID), materialCode };

						try {

							// Update
							dC.updateInsertDelete(
									"INSERT INTO spelergrondstofkaart (idspel, idgrondstofkaart, idspeler) VALUES (?, ?, NULL);",
									params_Insert);

						} catch (Exception e) {
							System.out.println("Warning: [InsertMaterials Model] - Inserting materials failed");
							e.printStackTrace();
						}
					}
				}

			}
		} catch (Exception e) {
			System.out.println("Warning: [InsertMaterials Model] - Inserting materials failed");
			e.printStackTrace();
		}
	}
}
