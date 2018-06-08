package vlab.server_java.check;

import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.CheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple CheckProcessor implementation. Supposed to be changed as needed to provide
 * necessary Check method support.
 */
public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        int[][] studentAnswer = parseArray(instructions);

        String[] taskStrArray = generatingResult.getCode().split(";");
        int[][] matrixA = parseArray(taskStrArray[0]);
        int[][] matrixB = parseArray(taskStrArray[1]);

        int[][] correctMatrix = generateCorrectAnswer(matrixA, matrixB);

        BigDecimal studentScore = getStudentScore(studentAnswer, correctMatrix);
        return new CheckingSingleConditionResult(studentScore, "");
    }

    private BigDecimal getStudentScore(int[][] studentAnswer, int[][] correctMatrix) {
        int totalNumbers = studentAnswer.length * studentAnswer[0].length;
        int numberOfCorrect = 0;
        for (int i = 0; i < studentAnswer.length; i++) {
            for (int j = 0; j < studentAnswer[i].length; j++) {
                if (studentAnswer[i][j] == correctMatrix[i][j]) {
                    numberOfCorrect++;
                }
            }
        }
        return BigDecimal.valueOf((float)numberOfCorrect / totalNumbers);
    }

    private int[][] generateCorrectAnswer(int[][] matrixA, int[][] matrixB) {
        // A: l*m  B: m*n
        int l = matrixA.length;
        int m = matrixB.length;
        int n = matrixB[0].length;
        int[][] result = new int[l][n];
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                result[i][j] = 0;
                for (int r = 0; r < m; r++) {
                    result[i][j] += matrixA[i][r] * matrixB[r][j];
                }
            }
        }
        return result;
    }

    private int[][] parseArray(String data) {
        data = data.replaceAll(" ", "");
        data = data.substring(0, data.length() - 1);
        data = data.substring(1);
        String[] stringArrays = data.split("],\\[");
        List<int[]> resultList = new ArrayList<>();
        for (String s: stringArrays) {
            s = s.replaceAll("\\[", "").replaceAll("]","");
            String[] strArray = s.split(",");
            resultList.add(Arrays.stream(strArray).mapToInt(Integer::parseInt).toArray());
        }
        int[][] result = new int[][]{};
        return resultList.toArray(result);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {
    }
}
