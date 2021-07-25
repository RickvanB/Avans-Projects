package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseCommunicator {

	static private DatabaseCommunicator instance;

	private Connection connection;

	// Constructor
	private DatabaseCommunicator() {
		// Setup connection
		if (this.connection == null) {
			try {
				this.connection = DriverManager.getConnection(

						// ----------------------------------- OWN DB ----------------------------------
						"jdbc:mysql://databases.aii.avans.nl/jheugten1_db?user=jheugten1&password=Ab12345");

//				this.connection = DriverManager.getConnection(
//
//						// ----------------------------------- AVANS DB ----------------------------------
//						"jdbc:mysql://databases.aii.avans.nl/1_soprj4_catan?user=42IN04SOi&password=investeerder");
//		

			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
	}

	// Get connection

	public Connection getConnection() {
		return connection;
	}

	/**
	 * Do a select query in the database
	 * 
	 * @param String
	 *            query
	 * @return Resultset result
	 */
	public ResultSet select(String query, String[] params) {
		ResultSet result = null;
		PreparedStatement select;
		try {
			if (params == null) {
				select = this.connection.prepareStatement(query);
			} else {
				select = this.connection.prepareStatement(query, params);
				// Build params
				for (int i = 0; i < params.length; i++) {
					select.setString(i + 1, params[i]);
				}
			}

			if (!(this.connection.isClosed()) && this.connection.isValid(0)) {
				result = select.executeQuery();
			}

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("WARNING: ILLEGAL ACTION");
		}

		return result;
	}

	/**
	 * Updates, inserts or deletes data
	 * 
	 * @param String
	 *            query
	 * @param String[]
	 *            params
	 */
	public void updateInsertDelete(String query, String[] params) {
		ResultSet result = null;
		try {
			PreparedStatement select;
			if (params.length == 0) {
				select = this.connection.prepareStatement(query);
			} else {
				select = this.connection.prepareStatement(query, params);
				// Build params
				for (int i = 0; i < params.length; i++) {
					select.setString(i + 1, params[i]);
				}
			}
			if (!(this.connection.isClosed()) && this.connection.isValid(0)) {
				select.executeUpdate();

			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("WARNING: ILLEGAL ACTION");
		}
	}

	/**
	 * Closes the database connection.
	 */
	public void closeConnection() {
		try {
			if (connection != null) {
				this.connection.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static DatabaseCommunicator getInstance() {
		if (instance == null) {
			instance = new DatabaseCommunicator();
		}
		return instance;
	}
}
