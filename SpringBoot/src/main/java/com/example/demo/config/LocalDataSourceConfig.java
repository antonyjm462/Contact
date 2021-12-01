package com.example.demo.config;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@Profile("DB_local")
public class LocalDataSourceConfig {

	/**
	 * @return DataSource
	 * @throws SQLException
	 */
	@Bean
	@Primary
	public DataSource dataSource() throws SQLException {

		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.sap.db.jdbc.Driver");

		dataSource.setUrl(
				"jdbc:sap://5165b876-9aa2-41ce-8be6-8caf5bcecd4b.hana.trial-eu10.hanacloud.ondemand.com:443?encrypt=true&validateCertificate=true&currentschema=USR_1O83BS1WXZNIS9D7IEQXHNUXZ");
		dataSource.setUsername("USR_1O83BS1WXZNIS9D7IEQXHNUXZ");
		dataSource.setPassword(
				"Go5TNqKrtntMXnCVaLLQY8.nFVpI6-DumlQQ9uPBJkubVK7GH_Nns2V-yxOHMbUS1M2K6WRZ9GociBMFuC34v8ac5ApNEWuG-cOVDT9AGpDH.SnsBGEU.EfYwEiq90.Z");

		return dataSource;
	}

}

