#!/bin/bash
#
# Creator: Zoltan Kornél Torok, taz19880922@gmail.com, 2014.03.09.
#
# Usage: [first parameter is the pdf file] [page number comma separated list, this pages won't split] 
#
# dependencies: ImageMagick library and poppler-utils.
#
echo "Start to split document..."
declare -i i 
i=0
echo "Start to extract images..."
rm -r tmpImages
mkdir tmpImages
declare -i shouldSkip
declare -i width
declare -i height
declare -i halfWidth
pdfimages -j -q "$1" tmpImages/image
echo "Finished extract images"
echo "Start process images..."
i=-1
for image in `ls tmpImages/*` 
do
    i=i+1
    shouldSkip=0
    for skip in `echo $4 | tr "," "\n"`
    do
        if [[ $skip == $i ]]; then
            shouldSkip=1
            break;
        fi
    done
    if [[ $shouldSkip == 0 ]]; then
        echo "split the $image..."
        width=$(convert $image -print "%w" /dev/null)
        height=$(convert $image -print "%h" /dev/null)
        halfWidth=width/2
        convert -crop "${halfWidth}x${height}" $image  "tmpImages/${image:10:9}-%d.jpg"
        rm $image
        echo "split finished"
    fi
done
echo "Finish process images."
echo "Start to import images to pdf"
echo "After check the images, please give the new pdf file path and name:"
read name
convert tmpImages/*.jpg $name
echo "Finish import."
echo 'finnished to split document.'
