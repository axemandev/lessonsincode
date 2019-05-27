package learn.axemandev;

import static org.assertj.core.api.Assertions.fail;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.RepetitionInfo;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestReporter;
import org.junit.jupiter.api.condition.EnabledOnOs;
import org.junit.jupiter.api.condition.OS;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/*
 * TODO Read about custom providers to allow dependency injection of instances in JUnit.
 * 
 * @RunWith: This annotation provides runner class that is used to run test cases. RunWith 
 * is succeeded by @ExtendWith(SpringExtension.class) that provides more powerful control 
 * over the runner.
 *
 * @SpringBootTest: provides a container for test cases with auto-instantiated objects 
 * like applicationContext and webEnvironment that provides access to various context and 
 * env parameters to test cases.
 *  
 * @TestInstance(Lifecycle): controls lifecycle behavior of class. One of the controls is 
 * creating a single instance for all test cases (methods) instead of default behavior of
 * creating one instance each test case. 
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
public class SpringLessonInCodeApplicationTests {

	/*
	 * Declare class level members that should be accessed in all test cases here.
	 */
	TestInfo testInfo;
	TestReporter testReporter;

	/*
	 * @Test: Declares a method as test case
	 * 
	 * @DisplayName: JUnit displays text in this annotation parameter instead of
	 * method name. This is more verbose and easy to interpret when there are too
	 * many methods.
	 * 
	 * @Disabled: This test case will not be executed. But it will still appear in
	 * test cases list in Junit console.
	 * 
	 * @BeforeEach: Method will be executed before execution of each test case. In
	 * JUnit5 a new instance of class is created for each test case (method).
	 * 
	 * @AfterEach: Method wil be executed after each test case. Same rules apply as
	 * before each.
	 */

	@Test
	@DisplayName("Test to validate context values")
	@Disabled
	@BeforeEach
	@AfterEach
	public void contextLoads() {
	}

	/*
	 * @BeforeAll: Method annotated with tag executes once before instantiation of
	 * class. As class instance does not exist, the method SHOULD be declared as
	 * static, unless class is annotated with @TestInstance(Lifecycle.PER_CLASS) in
	 * which case before all will be invoked after class instantiation and method
	 * does not require to be static.
	 * 
	 * @TestInfo: provides a mechanism to log information about test cases being
	 * executed. This interface provides access to test case metadata like test case
	 * name, tags, etc. Details are reported to console.
	 * 
	 * @TestReporter: similar to test info but provides more systematic logging with
	 * timestamp. Can be executed in beforeEach to provide a common ground for all
	 * test cases to log information.
	 * 
	 * Both TestInfo and TestReporter are dependency injected here by JUnit.
	 */
	@BeforeAll
	public void init(TestInfo testInfo, TestReporter testReporter) {
		this.testInfo = testInfo;
		this.testReporter = testReporter;
	}

	/*
	 * @AfterAll: This method will be invoked once after all test cases in class are
	 * complete. Same rules apply as @BeforeAll
	 */
	@AfterAll
	public static void destroy() {
	}

	/*
	 * Conditional executions: @EnabledXXX annotations conditionally enable test
	 * cases based on provided factors. If the condition is not met, the test case
	 * is disabled.
	 * 
	 * Other examples: EnabledOnJre(JRE.XX), EnabledIf, EnabledIfSystemProperty,
	 * EnabledIfEnvironmentVariable.
	 * 
	 * On similar lines, assumeXXX(condition) is programmatic way of disabling the
	 * test case if condition is not met.
	 */
	@Test
	@EnabledOnOs(OS.WINDOWS)
	public void windpwsTest() {

		/*
		 * fail() fails the test case unconditionally. This is normally used when method
		 * has not yet implemented the case and is just a placeholder.
		 */
		fail("Test case not yet implemented");

		/*
		 * Assert conditions check for conditions named with assertXXX method. Outcome
		 * should be what assert says in order to pass. Use String message in case of
		 * failure.
		 * 
		 * Some assert calls: assertTrue, assertFalse, assertEquals, assertArrayEquals,
		 * assertNull, Assertions.assertThrows
		 * 
		 * assertAll allows you to test multiple assert conditions in one go using
		 * lambda execution parameters.
		 */
		Assertions.assertAll(() -> assertTrue(10 < 20), () -> assertFalse(10 > 20), () -> assertNull(null));

		/*
		 * Conditional execution. Do not execute this test case if the assumption is not
		 * correct.
		 * 
		 * For messages, use a lambda that returns string instead of using a string
		 * message directly. This optimizes test case by building string iff condition
		 * fails, saving overhead of string building on each assert statement.
		 */
		Assumptions.assumeTrue(true, () -> "Should be true");
	}

	/*
	 * @Nested: nested test cases provide a hierarchical order to test cases. When
	 * one of the child test case fails (while other siblings succeed) the parent is
	 * marked as failed. Nesting test cases makes it easier to evaluate results by
	 * grouping test cases under one concern area together.
	 * 
	 * @Tag: tags are useful when only a particular set of tests should be executed.
	 * This is handy while testing a specific functionality or part of a
	 * functionality. Tagging different test cases with same name virtually groups
	 * the together.
	 * 
	 * In IDE use JUnit run configurations to provide tags to be used in the run. In
	 * Maven use configuration to include/exclude tags within surefire plugin.
	 */
	@Nested
	@Tag("People")
	@DisplayName("People test")
	class PeopleTest {

		/*
		 * @RepeatedTest(xTimes): Repeat this test x number of times. When tagged with
		 * repeated test, test case is injected with RepetitionInfo (optional) that
		 * provides handle to reptition details. Values from methods on repeat info can
		 * be used to conditionally modify test based on iteration #.
		 */
		@Test
		@RepeatedTest(4)
		void areGood(RepetitionInfo repeatInfo) {
			repeatInfo.getCurrentRepetition();
			repeatInfo.getTotalRepetitions();
		}

		/*
		 * Usage of testInfo and testReporter is displayed in this method. Use it for
		 * nice reporting on testing that can be useful for analysis.
		 */
		@Test
		void areLeaders() {
			testReporter.publishEntry("Executing " + testInfo.getTestMethod() + " with tags " + testInfo.getTags());
		}
	}

}
