package com.pugnascotia.reactdemo.config;


import org.apache.geronimo.transaction.manager.RecoverableTransactionManager;
import org.apache.jackrabbit.jca.JCAManagedConnectionFactory;
import org.jencks.factory.ConnectionManagerFactoryBean;
import org.jencks.factory.TransactionManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jca.support.LocalConnectionFactoryBean;

import javax.resource.spi.ConnectionManager;

@Configuration
public class ContentRepository {


	private static final java.lang.String DEFAULT_CONF_FILE = "classpath:repository.xml";
	private static final java.lang.String DEFAULT_REP_DIR = "${jackrabbit.homeDir}/jackrabbit";

	@Bean
	public JCAManagedConnectionFactory repositoryManagedConnectionFactory() {
		JCAManagedConnectionFactory jcaManagedConnectionFactory = new JCAManagedConnectionFactory();
		jcaManagedConnectionFactory.setHomeDir(DEFAULT_REP_DIR);
		jcaManagedConnectionFactory.setConfigFile(DEFAULT_CONF_FILE);
		return jcaManagedConnectionFactory;
	}

	@Bean
	public LocalConnectionFactoryBean jencksRepository() throws Exception {
		LocalConnectionFactoryBean localConnectionFactoryBean = new LocalConnectionFactoryBean();

		localConnectionFactoryBean.setManagedConnectionFactory(repositoryManagedConnectionFactory());
		localConnectionFactoryBean.setConnectionManager(pooledConnectionManagerJcr());
		return localConnectionFactoryBean;
	}

	@Bean
	public ConnectionManager pooledConnectionManagerJcr() throws Exception {
		ConnectionManagerFactoryBean connectionManagerFactoryBean = new ConnectionManagerFactoryBean();
		connectionManagerFactoryBean.setTransactionManager(txManagerJencks());
		connectionManagerFactoryBean.setTransaction("xa");
		connectionManagerFactoryBean.setPoolMinSize(1);
		connectionManagerFactoryBean.setPoolMaxSize(5);
		connectionManagerFactoryBean.setConnectionMaxIdleMinutes(5);

		return (ConnectionManager) connectionManagerFactoryBean.getObject();
	}

	@Bean
	public RecoverableTransactionManager txManagerJencks() throws Exception {
		TransactionManagerFactoryBean transactionManagerFactoryBean = new TransactionManagerFactoryBean();
		return (RecoverableTransactionManager) transactionManagerFactoryBean.getObject();
	}
}
