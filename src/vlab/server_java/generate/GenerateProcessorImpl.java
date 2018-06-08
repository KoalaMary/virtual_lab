package vlab.server_java.generate;

import rlcp.generate.GeneratingResult;
import rlcp.server.processor.generate.GenerateProcessor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Simple GenerateProcessor implementation. Supposed to be changed as needed to
 * provide necessary Generate method support.
 */
public class GenerateProcessorImpl implements GenerateProcessor {
    @Override
    public GeneratingResult generate(String condition) {
        //do Generate logic here
        String text = "Найти произведение матриц";
        String[][] matrixA = new String[3][2];
        String[][] matrixB = new String[2][3];

        Random rnd = new Random(System.currentTimeMillis());

        for (int i = 0; i < matrixA.length; i++) {
            for (int j = 0; j < matrixA[i].length; j++) {
                matrixA[i][j] = String.valueOf(rnd.nextInt(10));
            }
        }
        for (int i = 0; i < matrixB.length; i++) {
            for (int j = 0; j < matrixB[i].length; j++) {
                matrixB[i][j] = String.valueOf(rnd.nextInt(10));
            }
        }
        List<String> arrays = new ArrayList<String>() {{
            add(Arrays.deepToString(matrixA));
            add(Arrays.deepToString(matrixB));
        }};
        String code = String.join(";", arrays);
        String instructions = "instructions";

        return new GeneratingResult(text, code, instructions);
    }
}
